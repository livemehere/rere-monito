import React from "react";
import { useState, useEffect } from "react";
import styled, { css } from 'styled-components';
import { FaPause } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import { FaStop } from 'react-icons/fa';
import axios from "axios";
import { MdDone, MdDelete } from 'react-icons/md';


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


export function ListTimer({ id, done, text, textarea }) {

  const [initTime, setInitTime] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:3001/subjects/${id}`)
    .then(Response => {
    setInitTime(Response.data.time)
    })
  })
  

  const [time, setTime] = React.useState(initTime);
  const [timerOn, setTimerOn] = React.useState(false);

  useEffect(()=>{
    setTime(initTime);
  },[initTime])
  

  React.useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 100);
      }, 100);
    } else if (!timerOn) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);


  const onUpdate = () => {
    fetch(`http://localhost:3001/subjects/${id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          done: done,
          text: text,
          textarea: textarea,
          time: time
        })
      })
  }


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
        {timerOn && <BtnPause onClick={() => {setTimerOn(false); onUpdate();}
        }><FaPause></FaPause></BtnPause>}
        {!timerOn && time > 0 && (
          <BtnPlay onClick={() => {setTimerOn(true)}}><FaPlay></FaPlay></BtnPlay>
        )}
        {time >= 0 && (
          <BtnReset onClick={() => setTime(0)}><FaStop /></BtnReset>
        )}
        
      </Timers>
      <CheckCircle done={done} onClick={OnToggle}>
            {done && <MdDone />}
            </CheckCircle>
    </div>
    
  )
};
