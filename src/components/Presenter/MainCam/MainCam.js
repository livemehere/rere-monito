import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import {GrPowerReset} from "react-icons/gr"
// import { TodoCreate } from './TodoCreate';
import ListTimer from './Timer'
import { TodoList } from './TodoList';
import MainCamAi from './MainCamAi';
import axiosManager from "../../../util/axiosManager";
import { userState } from '../../../atoms/user';
import { useRecoilState } from "recoil";

const Div = styled.div`
  margin: 0px;
`;

const CamStates = styled.div`
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  padding-top: 20px;
  width: 100%;
  height: 10vh;
  margin: 0px;
  margin-bottom: 5%;
  box-shadow: 0px 10px 10px 0px #bfb9b4;
  margin-top: 5vh;
  padding-bottom: 2vh;
`;

const Block = styled.div`
  margin: 0px;
  position: relative;
  border-radius: 20px;
  width: 100%;
  height: 80vh;
  
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
`;

// const Btn1 = styled.button`
//   width: 10vh;
//   height: 10vh;
//   border: 5px solid #d1963e;
//   border-radius: 50%;
//   align-items: center;
//   justify-content: center;
//   position: relative;
  
//   font-size: 40px;
//   background-color: white;
//   background-size: contain;
//   padding-top: 2%;

//   color: #d1963e;
  
//   top: -200px;

//   &:hover {
//     color: #D1A66F;
//     border: 5px solid #D1A66F;
//   }
// `;

const BtnReset = styled.button`
  color: white;
  font-size: 24px;
  border-radius: 6px;
  font-weight: bold;
  position: absolute;
  background-color: #e9a681;
  left: 0%;
  border: 0;
  &:hover {
    background-color: #FBCFB7; 
  }
`;

const VideoBox = styled.div`
  line-height: 50px;
  font-size: 24px;
  font-weight: 600;
  margin: 10px;
  width: 540px;
  height: 580px;
  position: relative;
  left : 10%;
  top : 4%;
  background-color: black;
  
`;

const RightBlock = styled.div`
  line-height: 50px;
  font-size: 24px;
  font-weight: 600;
  margin: 10px;
  width: 80vh;
  position: relative;
  left: 18%;
  
`;

const TimeBlock = styled.div`
  text-align: center;
  line-height: 15vh;

  color: white;
  font-size: 4vh;
  font-weight: 600;
  
  margin: 10px;
  margin-left: 6vh;
  width: 70vh;
  height: 15vh;
  position: relative;
  top: 15px;
  border-radius: 20px;
  background: linear-gradient(80deg, #f1da94, #e9a681);

`;

const SubjectBlock = styled.div`
  padding-left: 2vh;
  text-align: left;
  line-height: 50px;
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin: 10px;
  width: 68vh;
  height: 15vh;
  position: relative;
  top: 20px;
  border-radius: 20px;
  background: linear-gradient(90deg, #ECBFBF, #FF9696);
  
`;

const BtnAdd =styled.button`
  width: 11vh;
  height: 4.5vh;
  border-radius: 5px;
  position: relative;
  top: 3vh;
  left: 75%;
  background-color: #e6b771;
  font-size: 16px;
  color: white;
  border: 0;
  font-weight: 600;

  &:hover {
    background-color: #d1963e;
  }
`;


function CamSide() {
  const [user, setUser] = useRecoilState(userState);
  const [allTime, setAllTime] = useState([]);

  const [timerOn, setTimerOn] = React.useState(false);

  useEffect(() => {
    axiosManager.axios(`/record/${user.id}`, "GET")
    .then((res) => {
      setTime(res.time_sum[0].total_study_time);
      
    })
  }, []);

  useEffect(() => {
    axiosManager.axios(`/record/${user.id}`, "GET")
    .then((res) => {
        res.records.forEach((r) => {
        allTime.push({
          id: r.id,
          name: r.name,
          total_time: r.total_time,
          content: r.content,
        });
      });
      setAllTime(allTime);
      console.log(allTime[0]);
    })
    
  }, []);

  console.log(allTime.length)

  const [time, setTime] = useState(0);

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

  // const onUpdate = (currentTime) => {
  //   axiosManager.axios(`/time`, "PUT", {
  //     headers : {'Content-Type': 'application/x-www-form-urlencoded', },
  //     id: user.id,
  //     total_time: currentTime,
  //     focus_time: 11111,
  //   })
  // }

  const setZero = () => {
    if(window.confirm('진행시간을 초기화 하시겠습니까?')){
      for(let i=0; i<allTime.length; i++){
        axiosManager.axios(`/record`, "POST", {
          headers : {'Content-Type': 'application/x-www-form-urlencoded', },
          user_id: user.id,
          name: allTime[i].name,
          focus_time: 0,
          unfocus_time: 0,
          content: allTime[i].content,
        })
      }
      setTime(0);
    }
  }

        // for(let i=0; i < allTime.records.length; i++){
      //   axiosManager.axios(`/record`, "POST", {
      //     headers : {'Content-Type': 'application/x-www-form-urlencoded', },
      //     user_id: user.id,
      //     // name: text,
      //     focus_time: 0,
      //     unfocus_time: 0,
      //   })
      // }

  //내일 질문

  // for(let i=0; i<responseData.length; i++){
  //           let time = (responseData[i].cumulative_time)
  //           dataNum.push(time)
  // }
  // console.log(allTime.length)

  return(
    <>
      <VideoBox>
        <MainCamAi />
        {/* {!timerOn && time > 0 && (
          <BtnReset onClick={() => {setZero(); setTime(0);}}>초기화</BtnReset>
        )} */}
        
      </VideoBox>
      
      <RightBlock>
      <TimeBlock>
      <BtnReset onClick={() => {setZero();}}>reset</BtnReset>
      <div id="display">공부시간 :&nbsp; 
        <span>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span> 
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
      </div>

      </TimeBlock>
        <TodoList />          
        {/* <TodoCreate /> */}
      </RightBlock>
    </>
  )
}


export { Div, CamStates, Block, CamSide, SubjectBlock, BtnAdd };
