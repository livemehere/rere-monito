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
  const [focusss, setFocusss] = useState([]);
  const [unFocusss, setUnFocusss] = useState([]);

  const yesterday =  moment().subtract(0,'days').format("YYYY-MM-DD"); // 어제 날짜

  useEffect(() => {
    axiosManager.axios(`/record/${user.id}`, "GET").then((datas) => {

      const datasFocus = []; // 집중시간
      const datasUnfocus = []; // 집중불량 시간 

      const focusdataset = [];

      let focuss = 0;
      let unfocuss = 0;
 
      for(let i=0; i<datas.records.length; i++){ // record 길이 반복문
        const datee = moment(datas.records[i].date).format('YYYY-MM-DD');  // record 속 데이터 날짜 값 설정 === datee
        if(datee === yesterday){// 어제날짜와 데이터의 날짜가 같을 시 저장하기 datee === yesterday

          datasFocus.push(datas.records[i].focus_time/1000) // 집중
          datasUnfocus.push(datas.records[i].unfocus_time/1000) // 불량

        }
      }

      for (let i = 0; i < datasFocus.length; i++){ // 과목들 집중도 값 더하기
        focuss += Number(datasFocus[i]);
        unfocuss += Number(datasUnfocus[i]);
      }
      // console.log("더한 값",focuss, unfocuss);

      focusdataset.push({
        unfocuss:unfocuss,
        focuss:focuss,
      });

      setUnFocusss(parseInt(unfocuss))
      setFocusss(parseInt(focuss));
      // console.log(`set 설정 = ${focusss} , ${unFocusss}`);
    });
  }, [focusss, unFocusss]);



  // 하루 집중
  const yeslabels = ["자세불량(min)","집중(min)"]; // 표에 표시될 labels
  const yesdataset = [unFocusss/60,focusss/60]; // 표에 표시될 datas

  const yesdatasecond = [unFocusss,focusss]; // 표에 표시될 datas

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

  const yesterdaysetsum = yesdatasecond.reduce(function add(sum, currValue){ // 전날 공부시간 구하기
    return sum+currValue;
  },0);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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