import { useEffect } from "react";
import { BackDiv } from "../../Presenter/UserMeasurement/UserMeasurementPresenter";
import UserMeasurementContext from "./UserMeasurementContext";
import { AlignTitlee } from "../../Presenter/Calendar/CalendarTitlePresenter";

export default function UserMeasurement() {
  const labels = ["자세불량","측정불가","집중"];

  const data = {
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

  useEffect(() => {
    //TODO: DB데이터 불러와서 가공하기
    // setState()
  }, []);
  return (
    <>
      <AlignTitlee>측정 결과 분석</AlignTitlee>
      <BackDiv>
        <UserMeasurementContext labels={labels} data={data} />
      </BackDiv>
    </>
  );
}
