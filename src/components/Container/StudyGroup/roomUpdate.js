
import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoSrc from '../../Presenter/StudyGroup/GroupFilter/book.jpg'
import { useLocation } from "react-router-dom";
import axiosManager from "../../../util/axiosManager";

const Logo = styled.img`
  width: 100%;
  max-height: 35vh;
  margin: 0px;
  opacity: 0.8;
  filter: brightness(120%);
  margin-bottom: 5vh;

  overflow: scroll;
  -ms-overflow-style: none;

  &::-webkit-scrollbar { 
    width: 0 !important;
  }
`;

const RoomInput = styled.div`
  margin-bottom: 1vh;
  display: flex;
  position: relative;
  border-radius: 20px;
  border: 4px solid #FFBE47;
  background: white;
  width: 800px;
  font-weight: bold;
`;

const MakeRoom = styled.input`
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 20px;
  outline: none;
  font-size: 1.4rem;
  padding: 5px;
`;

const SubmitBtn = styled.button`
  width: 120px;
  height: 60px;
  color: white;
  background: #FFBE47;
  font-size: 24px;
  border:none;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0,79,255,0.3);
  transition:0.3s;
  position: relative;
  left: 60%;
  
  transform: translate(-50%,-50%);
  .button-design{
  text-decoration-line: none;
  &:visited{
    color:white;
  }
  }
  &:focus {
  outline: 0;
  }
  &:hover{
  background: #DB9A33;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,79,255,0.6);
}
`;

const RoomTitle = styled.div`
  font-size: 40px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

function RoomUpdate({ rooms }) {
  const location = useLocation();
  const room = location.state;
  console.log(location.state);

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(''); 

    const onChange = e => setValue(e.target.value);
    // const onToggle = () => setOpen(!open);

    const navigate = useNavigate();

    // TODO: roomName 키 추가, 그외 키값들 수정필요

    function onSubmit(e){
        e.preventDefault();
        
        axiosManager.axios(`/room/`, "POST", {
          headers: { 'Content-type': 'application/x-www-form-urlencoded', },
          roomName : roomName.current.value,
          
        })
        .then(res =>{
            if (res) {
                alert("수정이 완료 되었습니다.");
                navigate("/group");
            }
        });
        
        setOpen(false);
    }

    const roomName = useRef(null);

    useEffect(() => {
      setValue(room.roomname)
    },[room.roomname])

    return (

  <main>
        <Logo src={LogoSrc}></Logo>
        
        <form onSubmit={onSubmit}>
            <RoomTitle>스터디룸 제목 수정 페이지</RoomTitle>
            <RoomInput>
                <MakeRoom type="text" placeholder="변경할 스터디룸의 이름을 정해주세요"
                 ref={roomName}
                 onChange={onChange}
                 value={value}></MakeRoom>
            </RoomInput>
            <SubmitBtn>수정 완료</SubmitBtn>
        </form>
        </main>
        
    );
}

export default React.memo(RoomUpdate);