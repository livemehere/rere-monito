import { useEffect, useState } from "react";
import UserMeasurementContext from "./UserMeasurementContext";
import { AlignTitlee } from "../../Presenter/Calendar/CalendarTitlePresenter";
import WeekContext from "./WeekContext";

import axiosManager from "../../../util/axiosManager";
import { useRecoilState } from "recoil";
import { userState } from "../../../atoms/user";

import moment from "moment";


const UserMeasurement = () => { 

  const [user, setUser] = useRecoilState(userState);
  const [focus, setFocus] = useState();
  const [unfocus,setUnFocus] = useState();

  const yesterday =  moment().subtract(1,'days').format("YYYY-MM-DD"); // 어제 날짜


  useEffect(() => {

    axiosManager.axios(`/record/${user.id}`, "GET").then((datas) => {
      const dataNum = []; // 총 공부시간
      const dataFocus = []; // 집중시간
      const dataUnfocus = []; // 집중불량 시간 

      for(let i=0; i<datas.records.length; i++){ 
        const datee = moment(datas.records[i].date).format('YYYY-MM-DD');
        if(datee === yesterday){
          let total_time = (datas.records[i].total_time/60000)
          let focus_time = (datas.records[i].focus_time/60000)
          let unfocus_time = (datas.records[i].unfocus_time/60000)
    
          dataFocus.push(focus_time.toFixed(2)) // 집중
          dataUnfocus.push(unfocus_time.toFixed(2)) // 불량

        }
      }
      let dataSum = 0;
      let focuss = 0;
      let unfocuss = 0;

      for (let i = 0; i < dataFocus.length; i++){ // 과목들 값 더하기
        focuss += Number(dataFocus[i]);
        unfocuss += Number(dataUnfocus[i]);
      }

      // console.log("합한 값",focuss,unfocuss);
      setFocus(focuss);
      setUnFocus(unfocuss);
    });
  }, []);
   console.log("집중fsdfdfsfdfdfdf",focus,unfocus);
  

  // 하루 집중
  const yeslabels = ["자세불량(min)","집중(min)"];
  const yesdataset = [unfocus,focus];
  const yesdatasets = [25.6,140.4];
  console.log("data",yesdataset);
  console.log("datas",yesdatasets);

  const yesdata = {
    labels: yeslabels,
    datasets: [
      {
        label: "집중도(min)",
        data: yesdataset,
        backgroundColor: [
          "rgb(255, 177, 193, 0.6)",
          "rgb(165, 223, 223, 0.6)",
        ],
      },
    ],
  };

  const yesterdaysetsum = yesdataset.reduce(function add(sum, currValue){ // 전날 공부시간 구하기
    return sum+currValue;
  },0);

  // // 일주일 공부시간
  // const weeklabels = [week7, week6, week5, week4, week3, week2, week1, "평균",]; // 일주일 통계 label


  // const weekdataset = [50,45,82,20,35,70,90]; // 일주일 공부시간

  // const weekdatasetsum = weekdataset.reduce(function add(sum, currValue){ // 일주일 평균 구하기
  //   return sum+currValue;
  // },0);
  // const weekaverage = weekdatasetsum/weekdataset.length; 

  // weekdataset.push(weekaverage); // 평균값 배열에 넣기

  // const weekdata={
  //   labels: weeklabels,
  //   datasets: [
  //     {
  //       label: "공부시간(min)",
  //       data: weekdataset,
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //         'rgba(255, 205, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(61, 66, 161, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(201, 203, 207, 0.2)'
  //       ],
  //       borderColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(255, 159, 64)',
  //         'rgb(255, 205, 86)',
  //         'rgb(75, 192, 192)',
  //         'rgb(54, 162, 235)',
  //         'rgba(61, 66, 161)',
  //         'rgb(153, 102, 255)',
  //         'rgb(201, 203, 207)',
  //       ],
  //     },
  //   ],
  // }

  return (
    <>
      <AlignTitlee>측정 결과 분석</AlignTitlee>
        <UserMeasurementContext labels={yeslabels} data={yesdata} yesterdaysetsum={yesterdaysetsum}/>
        {/* <WeekContext labels={weeklabels} data={weekdata}/> */}
    </>
  );
}

export default UserMeasurement;