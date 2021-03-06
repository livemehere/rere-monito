import React, { useEffect, useRef, useState, useCallback } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import * as faceapi from "face-api.js"; //face-api
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { userState } from "../../../atoms/user";
import { useRecoilState } from "recoil";
import { AlignTitle } from "../../Presenter/Calendar/CalendarTitlePresenter";
import { countState } from "../../../atoms/studytime";

//생성되는 캠 div 만들기
const Container = styled.div`
  justify-items: start;
`;

const MyCam = styled.div`
  display: flex;
  width: 600px;
  height: 450px;
  position: relative;
  top: -40px;
  left: 150px;
`;

const StyledVideo2 = styled.video`
  opacity: 1;
  width: 600px;
  height: 450px;
  position: relative;
  border-radius: 20px;
  margin: 4%;
`;

const Emotions = styled.div`
  position: absolute;
  left: 15%;
  top: 12%;
  z-index: 90;
`;

const CamTimers = styled.div`
  font-size: 20px;
  font-weight: bold;
  position: relative;
  top: 112%;
  left: 15%;
  width: 100px;
  height: 40px;
  z-index: 99;
`;

const UserName = styled.div`
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  width: 100px;
  top: 112%;
  left: 95%;
  z-index: 99;
`;

const StyledVideo = styled.video`
  opacity: 1;
  width: 600px;
  height: 450px;
  position: relative;
  border-radius: 20px;
  margin-top: 50px;
`;

const OuterCam = styled.div`
  width: 100%;
`;

const RoomTitle = styled.div`
  margin-top: -80px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  line-height: 150px;
  color: #206966;
`;

//face-emotion
const expressionMap = {
  neutral: "😶",
  happy: "😄",
  sad: "😞",
  angry: "🤬",
  fearful: "😖",
  disgusted: "🤢",
  surprised: "😲",
};

var userJoin = 1;

const Video = (props) => {
  const ref = useRef();
  if (userJoin === 2) {
    props.peer.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
      userJoin = 1;
    });
  } else {
    userJoin = 1;
  }
  return <StyledVideo2 playsInline autoPlay ref={ref} />;
};

const StudyRoom = () => {
  const location = useLocation();
  const rooms = location.state.roomname; //link to 에서 props 받아옴

  const [user, setUser] = useRecoilState(userState);

  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const { roomID } = useParams();

  //face-api
  const [faceEmotion, setFaceEmotion] = useState(false);
  const [detected, setDetected] = useState(false);

  //timers
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hours, setHours] = useState(0);

  const [counter, setCounter] = useRecoilState(countState);

  useEffect(() => {
    socketRef.current = io.connect("https://monito.ml");
    navigator.mediaDevices
      .getUserMedia({ video: StyledVideo2, audio: false })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          if (users !== undefined) {
            userJoin = 2;
          }
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push({
              peerID: userID,
              peer,
            });
            console.log(peers);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          // console.log("==", payload);
          userJoin = 2;
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });
          setPeers((users) => [{ ...users, peer }]);
        });

        socketRef.current.on("user left", (id) => {
          const peerObj = peersRef.current.find((p) => p.peerID === id);
          peerObj.peer.detroying = true;
          //console.log(peerObj.peer);
          const peers = peersRef.current.filter((p) => p.peerID !== id);
          peersRef.current = peers;
          console.log("userLeft");
          setPeers(peers);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  //face - api;
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    };
    loadModels();
    return () => {
      if (userVideo?.current) {
        console.log("Cleaning up stream tracks...");
        userVideo.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (userVideo?.current) {
      userVideo.current.addEventListener("play", playCallback);
    }
  });

  let interval;
  const playCallback = useCallback(() => {
    interval = setInterval(faceDetection, 1000);
  }, []);

  const faceDetection = useCallback(async () => {
    if (userVideo.current) {
      setDetected(true);
      const detections = await faceapi
        .detectSingleFace(
          userVideo.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();
      setFaceEmotion(
        expressionMap[detections?.expressions.asSortedArray()[0].expression]
      );
      console.log(detections?.expressions.asSortedArray()[0].expression);
      if (detections?.expressions.asSortedArray()[0].expression === undefined) {
        setDetected(false);
        console.log("얼굴이 감지되지 않았습니다.");
      }
    }
  }, [userVideo]);

  useEffect(() => {
    console.log(counter);
    setHours(parseInt(counter / 3600));
    setMinutes(parseInt((counter % 3600) / 60));
    setSeconds(parseInt(counter % 60));
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (detected === true) {
        if (parseInt(seconds) < 60) {
          setSeconds(parseInt(seconds) + 1);
        } else if (parseInt(minutes) < 60) {
          setSeconds(0);
          setMinutes(parseInt(minutes) + 1);
        } else {
          setMinutes(0);
          setSeconds(0);
          setHours(parseInt(hours) + 1);
        }
        setCounter(
          parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)
        );
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [hours, minutes, seconds, detected]);
  //face - api;

  return (
    <div>
      <AlignTitle>
        <h1>스터디룸</h1>
      </AlignTitle>
      <RoomTitle>방 이름 : {rooms}</RoomTitle>
      <Container>
        <MyCam>
          <Emotions>{faceEmotion}</Emotions>
          <CamTimers>
            {hours < 10 ? `0${hours}` : hours}:
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </CamTimers>
          <UserName>{user.name}님</UserName>

          <OuterCam>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
          </OuterCam>
        </MyCam>

        {peers.map((peer, index) => {
          return <Video key={index} peer={peer} />;
        })}
      </Container>
    </div>
  );
};

export default StudyRoom;
