import { useEffect } from "react";
import { BackDiv } from "../../Presenter/UserMeasurement/UserMeasurementPresenter";
import UserMeasurementContext from "./UserMeasurementContext";
import { AlignTitlee } from "../../Presenter/Calendar/CalendarTitlePresenter";
import WeekContext from "./WeekContext";

export default function UserMeasurement() { // 하루 집중
  const labels = ["자세불량","측정불가","집중"];

  const datas = {
    labels: labels,
    datasets: [
      {
        label: "집중도",
        data: [50, 65, 90],
        backgroundColor: [
          "rgb(255, 177, 193, 0.6)",
          "rgb(255, 230, 170, 0.6)",
          "rgb(165, 223, 223, 0.6)",
        ],
      },
    ],
  };


  const weeklabels = ["월","화","수","목","금","토","일","평균",]; // 일주일 통계
  const weekdata={
    labels: weeklabels,
    datasets: [
      {
        label: "공부시간",
        data: [50, 45, 82, 20,35,70,90,65],
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

  useEffect(() => {
    //TODO: DB데이터 불러와서 가공하기
    // setState()
  }, []);

  return (
    <>
      <AlignTitlee>측정 결과 분석</AlignTitlee>
      <BackDiv>
        <UserMeasurementContext labels={labels} data={datas} />
        <WeekContext labels={weeklabels} data={weekdata}/>
      </BackDiv>
    </>
  );
}
