import { useEffect, useState } from "react";
import UserMeasurementContext from "./UserMeasurementContext";
import { AlignTitlee } from "../../Presenter/Calendar/CalendarTitlePresenter";
import WeekContext from "./WeekContext";

import moment from "moment";

export const focusdata = [
  {
    date:"2022-05-18T00:00:00.000Z",
    total:120,
    focuss:65,
    notfocus:25,
    notfound:30
  },
  {
    date:"2022-05-23T00:00:00.000Z",
    total:"150",
    focuss:"75",
    notfocus:"35",
    notfound:"40"
  },
]

export const weekdatas = [
  {
    date:"2022-05-18T00:00:00.000Z",
    time:"120",
  },
  {
    date:"2022-05-19T00:00:00.000Z",
    time:"50",
  },
  {
    date:"2022-05-20T00:00:00.000Z",
    time:"45",
  },
  {
    date:"2022-05-21T00:00:00.000Z",
    time:"82",
  },
  {
    date:"2022-05-22T00:00:00.000Z",
    time:"20",
  },
  {
    date:"2022-05-23T00:00:00.000Z",
    time:"35",
  },
  {
    date:"2022-05-24T00:00:00.000Z",
    time:"70",
  },
  {
    date:"2022-05-25T00:00:00.000Z",
    time:"90",
  }];

export default function UserMeasurement() { 
  
  const[yesterdaymeasure,setYesterdaymeasure] = useState([]);
  const [weekmeasure, setWeekmeasure] = useState([]);

  const yesterday =  moment().subtract(1,'days').format("YYYY-MM-DD");

  const week1 =  moment().subtract(1,'days').format("MM-DD"); // 일주일 날짜 불러오기
  const week2 =  moment().subtract(2,'days').format("MM-DD");
  const week3 =  moment().subtract(3,'days').format("MM-DD");
  const week4 =  moment().subtract(4,'days').format("MM-DD");
  const week5 =  moment().subtract(5,'days').format("MM-DD");
  const week6 =  moment().subtract(6,'days').format("MM-DD");
  const week7 =  moment().subtract(7,'days').format("MM-DD");


  useEffect(() => {
    //TODO: DB데이터 불러와서 가공하기

    const weekinitialData = []; // 일주일
      
    weekdatas.forEach((weekdatas) => {
      weekinitialData.push({
        date:weekdatas.date,
        time:weekdatas.time,
      });
    });
    setWeekmeasure(weekinitialData);

    const yesterdayinitialData = []; // 전날

    console.log("어제",yesterday);

    focusdata.forEach((focusdata) => {
      
      const focusdatee = moment(focusdata.date).format("YYYY-MM-DD");

      if(focusdatee===yesterday){
        yesterdayinitialData.push({
          date:focusdata.date,
          total:focusdata.total,
          focuss:focusdata.focuss,
          notfocus:focusdata.notfocus,
          notfound:focusdata.notfound,
        });
      }
    });
    setYesterdaymeasure(yesterdayinitialData);
    console.log("값",yesterdaymeasure);
  }, []);

  // 하루 집중
  const labels = ["자세불량(min)","집중(min)"];

  const datas = {
    labels: labels,
    datasets: [
      {
        label: "집중도(min)",
        data: [24,138],
        backgroundColor: [
          "rgb(255, 177, 193, 0.6)",
          "rgb(165, 223, 223, 0.6)",
        ],
      },
    ],
  };

  // 일주일 공부시간
  const weeklabels = [week7, week6, week5, week4, week3, week2, week1, "평균",]; // 일주일 통계 label


  const weekdataset = [50,45,82,20,35,70,90]; // 일주일 공부시간

  const weekdatasetsum = weekdataset.reduce(function add(sum, currValue){ // 일주일 평균 구하기
    return sum+currValue;
  },0);
  const weekaverage = weekdatasetsum/weekdataset.length; 

  weekdataset.push(weekaverage); // 평균값 배열에 넣기

  const weekdata={
    labels: weeklabels,
    datasets: [
      {
        label: "공부시간(min)",
        data: weekdataset,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(61, 66, 161, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgba(61, 66, 161)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
      },
    ],
  }

  return (
    <>
      <AlignTitlee>측정 결과 분석</AlignTitlee>
        <UserMeasurementContext labels={labels} data={datas} />
        <WeekContext labels={weeklabels} data={weekdata}/>
    </>
  );
}
