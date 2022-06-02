import { useEffect, useState } from "react";
import UserMeasurementContext from "./UserMeasurementContext";
import WeekUserMeasurement from "./WeekUserMeasurement";
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
  const [day1focusss,setDay1focusss] = useState([]);
  const [day2focusss,setDay2focusss] = useState([]);
  const [day3focusss,setDay3focusss] = useState([]);
  const [day4focusss,setDay4focusss] = useState([]);
  const [day5focusss,setDay5focusss] = useState([]);
  const [day6focusss,setDay6focusss] = useState([]);
  const [day7focusss,setDay7focusss] = useState([]);

  const yesterday =  moment().subtract(0,'days').format("YYYY-MM-DD"); // 어제 날짜
  const day2 = moment().subtract(2,'days').format("YYYY-MM-DD");
  const day3 = moment().subtract(3,'days').format("YYYY-MM-DD");
  const day4 = moment().subtract(4,'days').format("YYYY-MM-DD");
  const day5 = moment().subtract(5,'days').format("YYYY-MM-DD");
  const day6 = moment().subtract(6,'days').format("YYYY-MM-DD");
  const day7 = moment().subtract(7,'days').format("YYYY-MM-DD");


  const week1 =  moment().subtract(1,'days').format("MM-DD"); // 일주일 날짜 불러오기
  const week2 =  moment().subtract(2,'days').format("MM-DD");
  const week3 =  moment().subtract(3,'days').format("MM-DD");
  const week4 =  moment().subtract(4,'days').format("MM-DD");
  const week5 =  moment().subtract(5,'days').format("MM-DD");
  const week6 =  moment().subtract(6,'days').format("MM-DD");
  const week7 =  moment().subtract(7,'days').format("MM-DD");

  useEffect(() => {
    axiosManager.axios(`/record/${user.id}`, "GET").then((datas) => {

      const datasFocus = []; // 집중시간
      const datasUnfocus = []; // 집중불량 시간
      const datasweek1 = []; 
      const datasweek2 = []; 
      const datasweek3 = []; 
      const datasweek4 = []; 
      const datasweek5 = []; 
      const datasweek6 = []; 
      const datasweek7 = []; 


      const focusdataset = [];

      let focuss = 0;
      let unfocuss = 0;
      let day1focus = 0;
      let day2focus = 0;
      let day3focus = 0;
      let day4focus = 0;
      let day5focus = 0;
      let day6focus = 0;
      let day7focus = 0;
 
      for(let i=0; i<datas.records.length; i++){ // record 길이 반복문
        const datee = moment(datas.records[i].date).format('YYYY-MM-DD');  // record 속 데이터 날짜 값 설정 === datee
        if(datee === yesterday){// 어제날짜와 데이터의 날짜가 같을 시 저장하기 datee === yesterday
          datasFocus.push(datas.records[i].focus_time/1000) // 집중
          datasUnfocus.push(datas.records[i].unfocus_time/1000) // 불량

          datasweek1.push(datas.records[i].total_time/1000) // 총 공부시간
        }
        else if(datee === day2){
          datasweek2.push(datas.records[i].total_time/1000) // 총 공부시간
        }
        else if(datee === day3){
          datasweek3.push(datas.records[i].total_time/1000) // 총 공부시간
        }
        else if(datee === day4){
          datasweek4.push(datas.records[i].total_time/1000) // 총 공부시간
        }
        else if(datee === day5){
          datasweek5.push(datas.records[i].total_time/1000) // 총 공부시간
        }
        else if(datee === day6){
          datasweek6.push(datas.records[i].total_time/1000) // 총 공부시간
        }
        else if(datee === day7){
          datasweek7.push(datas.records[i].total_time/1000) // 총 공부시간
        }
      }

      for (let i = 0; i < datasFocus.length; i++){ // 과목들 집중도 값 더하기
        focuss += Number(datasFocus[i]);
        unfocuss += Number(datasUnfocus[i]);
        day1focus += Number(datasweek1[i]);
      }
      // console.log("더한 값",focuss, unfocuss);
      for(let i =0;i<datasweek2.length;i++){
        day2focus += Number(datasweek2[i]);
      }
      for(let i =0;i<datasweek3.length;i++){
        day3focus += Number(datasweek3[i]);
      }
      for(let i =0;i<datasweek4.length;i++){
        day4focus += Number(datasweek4[i]);
      }
      for(let i =0;i<datasweek5.length;i++){
        day5focus += Number(datasweek5[i]);
      }
      for(let i =0;i<datasweek6.length;i++){
        day6focus += Number(datasweek6[i]);
      }
      for(let i =0;i<datasweek7.length;i++){
        day7focus += Number(datasweek7[i]);
      }

      focusdataset.push({
        unfocuss:unfocuss,
        focuss:focuss,

        day1focus:day1focus,
        day2focus:day2focus,
        day3focus:day3focus,
        day4focus:day4focus,
        day5focus:day5focus,
        day6focus:day6focus,
        day7focus:day7focus,
      });

      setUnFocusss(parseInt(unfocuss)) // 집중도 값
      setFocusss(parseInt(focuss));

      setDay1focusss(parseInt(day1focus)); // 일주일 공부량 값
      setDay2focusss(parseInt(day2focus));
      setDay3focusss(parseInt(day3focus));
      setDay4focusss(parseInt(day4focus));
      setDay5focusss(parseInt(day5focus));
      setDay6focusss(parseInt(day6focus));
      setDay7focusss(parseInt(day7focus));

      // console.log(`set 설정 = ${focusss} , ${unFocusss}`);
      // console.log(`일주일 설정 = ${day1focusss/60} , ${day2focusss} , ${day3focusss} , ${day4focusss} , ${day5focusss} , ${day6focusss} , ${day7focusss}`);

      ///////////////////////////////////////////////////////////////////////////////////////////////////////

    });
  }, [focusss, unFocusss,
    day1focusss,day2focusss,day3focusss,day5focusss,day6focusss,day7focusss]);


  // 하루 집중
  const yeslabels = ["집중불량(min)","집중(min)"]; // 표에 표시될 labels
  const yesdataset = [unFocusss/60,focusss/60]; // 표에 표시될 datas

  const yesdatasecond = [unFocusss,focusss]; // 평균 구하기 위한 datas

  // 일주일 공부
  const weeklabels = [week7, week6, week5, week4, week3, week2, week1, "평균",]; // 일주일 통계 labels

  const weekdataset = [day7focusss/60, day6focusss/60, day5focusss/60, day4focusss/60, day3focusss/60, day2focusss/60, day1focusss/60];
  const weekdatasetsum = weekdataset.reduce(function add(sum, currValue){ // 일주일 평균 구하기
    return (sum+currValue/weekdataset.length);
  },0);

  const weekdatasets = [  // 표에 표시되는 일주일 공부시간
    parseFloat((day7focusss/60).toFixed(2)),
    parseFloat((day6focusss/60).toFixed(2)),
    parseFloat((day5focusss/60).toFixed(2)),
    parseFloat((day4focusss/60).toFixed(2)),
    parseFloat((day3focusss/60).toFixed(2)),
    parseFloat((day2focusss/60).toFixed(2)),
    parseFloat((day1focusss/60).toFixed(2)),
    parseFloat((weekdatasetsum).toFixed(2)),
  ];

  console.log("어제 집중도",yesdataset);
  console.log("일주일",weekdatasets);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

  const weekdata={
    labels: weeklabels,
    datasets: [
      {
        label: "공부시간(min)",
        data: weekdatasets,
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
        borderWidth:1,
      },
    ],
  }

  return (
    <>
      <AlignTitlee>측정 결과 분석</AlignTitlee>
      <UserMeasurementContext labels={yeslabels} data={yesdata} weeklabels={weeklabels} weekdata={weekdata} yesterdaysetsum={yesterdaysetsum}/>
    </>
  );
}

export default UserMeasurement;