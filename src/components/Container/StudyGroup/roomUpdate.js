
import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoSrc from '../../Presenter/StudyGroup/GroupFilter/book.jpg'
import { useLocation } from "react-router-dom";

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
  left: 100%;
  
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

// const InsertFormPositioner = styled.div`
//   width: 40%;
//   bottom: 55%;
//   left: 30%;
//   position: fixed;
  
// `;

// const InsertForm = styled.form`
//   background: #f8f9fa;
//   padding-left: 32px;
//   padding-top: 32px;
//   padding-right: 32px;
//   padding-bottom: 32px;

//   border-radius: 16px;
  
//   border: 5px solid black;
// `;

// const Input = styled.input`
//   padding: 12px;
//   border-radius: 4px;
//   border: 1px solid #dee2e6;
//   width: 100%;
//   outline: none;
//   font-size: 18px;
//   box-sizing: border-box;
// `;

function RoomUpdate({ rooms }) {
  const location = useLocation();
  const room = location.state;
  console.log(location.state);

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(''); 

    const onChange = e => setValue(e.target.value);
    // const onToggle = () => setOpen(!open);

    const navigate = useNavigate();

    

    function onSubmit(e){
        e.preventDefault();
        
        fetch(`http://localhost:3001/rooms/${room.id}`, {
            method : "PUT",
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...room,
                roomname: roomName.current.value,
            })
        })

        .then(res =>{
            if (res.ok) {
                alert("수정이 완료 되었습니다.");
                navigate("/StudyGroup");
            }
        });
        
        setOpen(false);
    }

    const roomName = useRef(null);

    useEffect(() => {
      setValue(room.roomname)
    },[room.roomname])

    return (
  //     <div>
  //     {open && (
  //   <InsertFormPositioner>
  //     <InsertForm onSubmit={onSubmit}>
  //       <Input ref={roomName}
  //         autoFocus
  //         placeholder="수정할 내용을 입력후 엔터를 누르세요"
  //         onChange={onChange}
  //         value={value}
  //       />
  //     </InsertForm>
  //   </InsertFormPositioner>
  // )}
  //   <button onClick={onToggle}>수정하기</button>
  //     </div>
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