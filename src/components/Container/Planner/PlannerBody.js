import React, { useRef,useEffect } from 'react';
import { DetailPlanner, OnlyPlanner, PlannerBackDiv } from '../../Presenter/Planner/PlannerBodyPresenter';
import { Chart, registerables } from 'chart.js';

const labels = [
    '자료구조',
    '데이터베이스',
    '컴퓨터구조',
    'C언어',
    'JAVA',
    '교양',
];
var dataNum = [60, 10, 37, 20, 30, 45];
var dataSum = 0;

for (let i = 0; i < dataNum.length; i++){
    dataSum += dataNum[i];
}

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
                        <li className='today-list'><p id="time-title">오늘의 공부시간</p> </li>  
                        <li className='today-list'><h1 id='total-time'>{Math.floor(dataSum / 60)}H {dataSum % 60}M</h1></li>
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