import React, { useRef,useEffect, useState } from 'react';
import { DetailPlanner, OnlyPlanner, PlannerBackDiv } from '../../Presenter/Planner/PlannerBodyPresenter';
import { Chart, registerables } from 'chart.js';
import axiosManager from '../../../util/axiosManager';
import { userState } from '../../../atoms/user';
import { useRecoilState } from 'recoil';

let is_action = false;
let is_action2 = false;

let userId = 14;

axiosManager.axios(`/record/${userId}`, "GET")
.then((res) => {
  labelsAndDatas(res.records);
  is_action = true;
  console.log(res.records)
});

const today = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0];

const labels = [];
var dataNum = [];


function labelsAndDatas(responseData) {
  if(is_action === true){
    return 0;
  }
  else{
    for(let i=0; i<responseData.length; i++){
      if(today == responseData[i].date.split("T")[0]){
        labels.push(responseData[i].name)
        let time = (responseData[i].total_time/60000)
        dataNum.push(time.toFixed(2))
        console.log(responseData[i].date.split("T")[0]);
      }
    }
  }    
}

var dataSum = 0;

const rendering = () => {
    const result = [];
    for (let i = 0; i < labels.length; i++) {
        result.push(<ul className='study-list'><li className='study-text'>{labels[i]}</li>  <li>{dataNum[i]}분 </li></ul>);
    }
    return result;
}


const data = {
      labels: labels,
    datasets: [{
          axis: 'y',
          fill:true,
      label: '과목 공부시간(min)',
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
        data: dataNum,
      borderWidth:1
    }],
  };
var options = {
    scales: {
        x: {
            stacked: true,
            display:true,
        },
        y: {
            stacked: true,
            display:true,
        }
    },
    indexAxis: 'y',
}
    //[{ color: '#2bc4bd', percent: 50 }, { color: '#7f58a3', percent: 31 }, { color: '#ebb860', percent: 19 }];
const PlannerBody = () => {

  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    userId = user.id;
    console.log(userId);
  }, [userId]);
  
  // const [user, setUser] = useRecoilState(userState);
  // const [getTime, setTimes] = useState([]);
  // const [getts, setGetts] = useState([]);

  

  //   useEffect(() => {
  //   axiosManager.axios(`/record/${user.id}`, "GET")
  //   .then((res) => {
  //       res.records.forEach((r) => {
  //       getTime.push({
  //         date: r.date.split("T")[0],
  //       })
        
  //     });
  //     labelsAndDatas(res.records);
  //   })
  // }, []);

  if(is_action2 === false){
    for (let i = 0; i < dataNum.length; i++){
      dataSum += Number(dataNum[i]);
    }
    is_action2 = true;
  }
  


const canvasDom = useRef(null);
    useEffect(() => {
      const ctx = canvasDom.current.getContext("2d");
        console.log(ctx);
        Chart.register(...registerables);
      new Chart(ctx, {
        type: "bar",
        data:data,
        options: options,
      });
    }, []);

    return (
        <>
            <PlannerBackDiv>
                <OnlyPlanner>
                <canvas ref={canvasDom} height="250"></canvas>
                </OnlyPlanner>
                <DetailPlanner>
                    <ul className='today-study-time'>
                        <li className='today-list'><p id="time-title">오늘의 공부시간({today})</p> </li>  
                        <li className='today-list'><h1 id='total-time'>{Math.floor(dataSum / 60)}H {dataSum.toFixed(0) % 60}M</h1></li>
                    </ul>
                    <ul>
                            {rendering()}
                    </ul>
                
                </DetailPlanner>
            </PlannerBackDiv>
        </>
    )
}

export default PlannerBody;