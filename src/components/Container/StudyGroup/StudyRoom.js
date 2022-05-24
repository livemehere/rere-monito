import React, { useEffect, useRef, useState, useCallback } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { userState } from "../../../atoms/user";
import { useRecoilState } from "recoil";
import getMediaDevices from "../../PeerAndSocket/getMediaDevices";
import Video from "../../PeerAndSocket/Video";
import { AlignTitle } from "../../Presenter/Calendar/CalendarTitlePresenter";

//생성되는 캠 div 만들기
const Container = styled.div`
  display: flex;
`;

const MyCam = styled.div`
  display: flex;
  width: 600px;
  height: 450px;
  position: relative;
  top: -40px;
  left: 150px;
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

const StyledVideo2 = styled.video`
  top: 50px;
  opacity: 1;
  height: 200px;
  position: relative;
  border-radius: 20px;
  margin: 4%;
`;

const RoomTitle = styled.div`
  margin-top: -80px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  line-height: 150px;
  color: #206966;
`;

// ---

const VideoWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`



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

const StudyRoom = () => {
  const location = useLocation();
  const rooms = location.state.roomname; //link to 에서 props 받아옴
  const [user, setUser] = useRecoilState(userState);
  const socketRef = useRef();
  const peersRef = useRef([]);
  const { roomID } = useParams();

  // 내 비디오 가져오기
  const videoRef = useRef();
  useEffect(()=>{
    getMediaDevices((stream)=>{
      videoRef.current.srcObject = stream;
    })
  },[])

  useEffect(()=>{
    socketRef.current = io.connect('http://localhost:8000');

  },[])

  return (
    <div>
      <AlignTitle>
        <h1>스터디룸</h1>
      </AlignTitle>
      <RoomTitle>방 이름 : {rooms}</RoomTitle>
      <VideoWrap>
        <Video videoRef={videoRef}/>
      </VideoWrap>
    </div>
  );
};

export default StudyRoom;
