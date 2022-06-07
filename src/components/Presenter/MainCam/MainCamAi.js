import React, { useEffect, useRef, useState, useCallback } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import * as faceapi from "face-api.js"; //face-api
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

const Container = styled.div`
  margin: 0px;
  height: 580px;
`;

const StyledVideo = styled.video`
  position: relative;
  width: 540px;
  height: 480px;
`;

const StatesBar = styled.div`
  height: 10vh;
  width: 100%;
  top: -100px;
  padding-top: 150px;
  position: relative;
`;

const Emotions = styled.div`
  postion: absolute;
  height: 50px;
`;

const State1 = styled.div`
  background-color: #E9A681;
  width: 14vh;
  height: 6vh;
  position absolute;
  bottom: -15%;
  left: 10%;
  font-size: 2.6vh;
  vertical-align: center;
  text-align: center;
  border-radius: 1vh;
  color: white;
  top: 103%; 
`;

const State2 = styled.div`
  background-color: #E9BE81;
  width: 12vh;
  height: 6vh;
  position absolute;
  bottom: -15%;
  left: 68%;
  font-size: 2.6vh;
  vertical-align: center;
  text-align: center;
  border-radius: 1vh;
  color: white;
  top: 103%; 
`;

const DetectTimer = styled.div`
  color: white;
  font-size: 18px;
  text-align: right;
  right: 10%;
  height: 20px;
  line-height: 14px;
  font-weight: 500;
`;

const Btn1 = styled.button`
  width: 10vh;
  height: 10vh;
  border: 5px solid #d1963e;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  position: relative;

  font-size: 40px;
  background-color: white;
  background-size: contain;
  padding-top: 2%;

  color: #d1963e;

  top: -200px;

  &:hover {
    color: #d1a66f;
    border: 5px solid #d1a66f;
  }
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

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  width: 600,
  height: 600,
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  //   const roomID = props.match.params.roomID;

  //face-api
  const [faceEmotion, setFaceEmotion] = useState(false);
  const [detected, setDetected] = useState(false);

  //timer
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    socketRef.current = io.connect("https://monito.ml");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        // socketRef.current.emit("join room", roomID);
        // socketRef.current.on("all users", (users) => {
        //   const peers = [];
        //   users.forEach((userID) => {
        //     const peer = createPeer(userID, socketRef.current.id, stream);
        //     peersRef.current.push({
        //       peerID: userID,
        //       peer,
        //     });
        //     peers.push(peer);
        //   });
        //   setPeers(peers);
        // });

        // socketRef.current.on("user joined", (payload) => {
        //   const peer = addPeer(payload.signal, payload.callerID, stream);
        //   peersRef.current.push({
        //     peerID: payload.callerID,
        //     peer,
        //   });

        //   setPeers((users) => [...users, peer]);
        // });

        // socketRef.current.on("receiving returned signal", (payload) => {
        //   const item = peersRef.current.find((p) => p.peerID === payload.id);
        //   item.peer.signal(payload.signal);
        // });
      });
  }, []);

  const [playing, setPlaying] = useState(undefined);

  const startOrStop = () => {
    if (playing) {
      const s = userVideo.current.srcObject;
      s.getTracks().forEach((track) => {
        track.stop();
      });
    } else {
      setPlaying(true);
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          userVideo.current.srcObject = stream;
        });
    }
    setPlaying(!playing);
  };

  // function createPeer(userToSignal, callerID, stream) {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream,
  //   });

  //   peer.on("signal", (signal) => {
  //     socketRef.current.emit("sending signal", {
  //       userToSignal,
  //       callerID,
  //       signal,
  //     });
  //   });

  //   return peer;
  // }

  // function addPeer(incomingSignal, callerID, stream) {
  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream,
  //   });

  //   peer.on("signal", (signal) => {
  //     socketRef.current.emit("returning signal", { signal, callerID });
  //   });

  //   peer.signal(incomingSignal);

  //   return peer;
  // }

  //face-api
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
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [hours, minutes, seconds, detected]);

  //face-api

  //캠 ON/OFF
  const [timerOn, setTimerOn] = React.useState(false);

  return (
    <>
      <Container>
        <Emotions>{faceEmotion}</Emotions>

        <StyledVideo muted ref={userVideo} autoPlay playsInline />
        <DetectTimer>
          실측정 시간 :&nbsp;
          {hours < 10 ? `0${hours}` : hours}:
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}&nbsp;
          <br></br>
        </DetectTimer>
      </Container>
      <StatesBar>
        <State1>자세불량</State1>
        <State2>집중</State2>
      </StatesBar>
      {!timerOn && (
        <Btn1
          onClick={() => {
            setTimerOn(true);
            startOrStop(playing);
          }}
        >
          <FaPlay></FaPlay>
        </Btn1>
      )}
      {timerOn && (
        <Btn1
          onClick={() => {
            setTimerOn(false);
            startOrStop(!playing);
          }}
        >
          <FaPause></FaPause>
        </Btn1>
      )}
    </>
  );
};

export default Room;
