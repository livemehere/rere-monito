import React from "react";
import { useState, useEffect } from "react";
import styled, { css } from 'styled-components';
import { FaPause } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import { FaStop } from 'react-icons/fa';
import { MdDone, MdDelete } from 'react-icons/md';
import axiosManager from "../../../util/axiosManager";
import { userState } from "../../../atoms/user";
import { useRecoilState } from "recoil";
import moment from "moment";


const Timers = styled.div`
    margin: 10px;
    position: absolute;
    display: flex;
    align-items: center;
    right: 10%;
    top: -5%;
`; 

const TimeDisplay = styled.div`
    margin-bottom: 20px;
    font-size: 2.4vh;
    color: white;
`;

const BtnPlay = styled.button`
    border: none;
    background: none;
    margin-bottom: 10px;
    font-size: 2vh;
    color: white;
    &:hover {
      color: #d1963e;
    }
`;

const BtnPause = styled.button`
    border: none;
    background: none;
    margin-bottom: 10px;
    font-size: 2vh;
    color: white;
    &:hover {
      color: #d1963e;
    }
`;

const BtnReset = styled.button`
    border: none;
    background: none;
    margin-bottom: 10px;
    font-size: 2vh;
    color: white;
    margin-left: -5px;     

    &:hover {
      color: #d1963e;
    }
`;

const CheckCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 16px;
  border: 2px solid #73635F;

  position: absolute;
  left: -7%;
  top: 38%;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 2px solid #38d9a9;
      color: #38d9a9;
    `}
`;

export function ListTimer({ id, done, text, textarea, SubTime }) {
  const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const [user, setUser] = useRecoilState(userState);

  const [time, setTime] = React.useState(SubTime);
  const [timerOn, setTimerOn] = React.useState(false);

  useEffect(()=>{
    setTime(SubTime);
  },[])
  

  React.useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else if (!timerOn) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);


  const onUpdate = (currentTime) => {
    axiosManager.axios(`/record`, "PUT", {
      headers : {'Content-Type': 'application/x-www-form-urlencoded', },
      id: id,
      cumulative_time: currentTime,
      endDate: nowTime
    })
  }

  const setZero = () => {
    if(window.confirm('진행시간을 초기화 하시겠습니까?')){
      axiosManager.axios(`/record`, "PUT", {
        headers : {'Content-Type': 'application/x-www-form-urlencoded', },
        id: id,
        cumulative_time: 0,
        endDate: nowTime
      })
      setTime(0);
    }
  }


    // 디비 키값 추가 필요 
    const OnToggle = () => {
      fetch(`http://localhost:3001/subjects/${id}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      console.log(time)
      fetch(`http://localhost:3001/subjects/${id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          done: !done,
          text: text,
          textarea: textarea,
          time: time
        })
      })
    }

  return (
    <div>
      <Timers>
        <TimeDisplay>
            <span>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
            
        </TimeDisplay>
        {!timerOn && time === 0 && (
          <BtnPlay onClick={() => setTimerOn(true)}><FaPlay></FaPlay></BtnPlay>
        )}
        {timerOn && <BtnPause onClick={() => {onUpdate(time); setTimerOn(false); }
        }><FaPause></FaPause></BtnPause>}
        {!timerOn && time > 0 && (
          <BtnPlay onClick={() => {setTimerOn(true)}}><FaPlay></FaPlay></BtnPlay>
        )}
        {time >= 0 && (
          <BtnReset onClick={() => setZero()}><FaStop /></BtnReset>
        )}
        
      </Timers>
      <CheckCircle done={done} onClick={OnToggle}>
            {done && <MdDone />}
            </CheckCircle>
    </div>
    
  )
};
