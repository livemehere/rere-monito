import {
    BackDivv,
    Mtitle,
    Mtime,
    Mmchart,
  } from "../../Presenter/UserMeasurement/UserMeasurementContextPresenter";
import WeekChart from "./WeekChart";

import { useEffect, useState } from "react";
import axiosManager from "../../../util/axiosManager";
import { useRecoilState } from "recoil";
import { userState } from "../../../atoms/user";

import moment from "moment";


  const WeekContext = () =>{

    const [user, setUser] = useRecoilState(userState);
    const[measure,setMeasure] = useState([]);

    // 일주일 공부시간
    const week1 =  moment().subtract(1,'days').format("MM-DD"); // 일주일 날짜 불러오기
    const week2 =  moment().subtract(2,'days').format("MM-DD");
    const week3 =  moment().subtract(3,'days').format("MM-DD");
    const week4 =  moment().subtract(4,'days').format("MM-DD");
    const week5 =  moment().subtract(5,'days').format("MM-DD");
    const week6 =  moment().subtract(6,'days').format("MM-DD");
    const week7 =  moment().subtract(7,'days').format("MM-DD");

    const labels = [week7, week6, week5, week4, week3, week2, week1, "평균",]; // 일주일 통계 label

    const weekdataset = [50,45,82,20,35,70,90]; // 일주일 공부시간

    const weekdatasetsum = weekdataset.reduce(function add(sum, currValue){ // 일주일 평균 구하기
      return sum+currValue;
    },0);
    const weekaverage = weekdatasetsum/weekdataset.length; 

    weekdataset.push(weekaverage); // 평균값 배열에 넣기

  const datas={
    labels: labels,
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

    const weekstart =  moment().subtract(7,'days').format("YYYY-MM-DD");
    const weekend =  moment().subtract(1,'days').format("YYYY-MM-DD");

      return(
          <BackDivv>
              <Mtitle>지난 일주일 공부시간</Mtitle>
              <Mtime>{weekstart} ~ {weekend}</Mtime>
              <Mmchart>
                <WeekChart labels={labels} data={datas}/>
              </Mmchart>   
          </BackDivv>
      );
  };

  export default WeekContext;