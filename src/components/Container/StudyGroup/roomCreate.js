import styled from "styled-components";
import useAxios from "../../Presenter/StudyGroup/axiosHook";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import LogoSrc from '../../Presenter/StudyGroup/GroupFilter/book.jpg'
import { v1 as uuid } from "uuid";
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

export default function CreateWord() {
    const id = uuid();

    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();

        axiosManager.axios(`/room/`, "POST", {
          headers: { 'Content-type': 'application/x-www-form-urlencoded', },
          roomName : roomName.current.value,
          max_member : 10,
          roomCode: id
        })
        .then(res =>{
            if(res) {
              console.log(".then executed")
                alert("????????? ?????? ???????????????.");
                navigate(`/group`);
            }
        });
    }

    const roomName = useRef(null);

    return (
        <main>
        <Logo src={LogoSrc}></Logo>
        
        <form onSubmit={onSubmit}>
            <RoomTitle>???????????? ?????? ?????????</RoomTitle>
            <RoomInput>
                <MakeRoom type="text" placeholder="?????? ????????? ??????????????? ????????? ???????????????" ref={roomName}></MakeRoom>
            </RoomInput>
            <SubmitBtn>??? ??????</SubmitBtn>
        </form>
        </main>
        
    );
}