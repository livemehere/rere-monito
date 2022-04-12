import { useEffect } from "react";
import { MeasurementTitle, BackDiv } from "../../Presenter/UserMeasurement/UserMeasurementPresenter";
import UserMeasurementContext from "./UserMeasurementContext";

export default function UserMeasurement() {
  const labels = ["happy", "natural", "angry", "sad", "suprised"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "집중도",
        data: [92, 65, 40, 50, 82],
        backgroundColor: [
          "rgb(255, 177, 193, 0.6)",
          "rgb(255, 207, 159, 0.6)",
          "rgb(255, 230, 170, 0.6)",
          "rgb(165, 223, 223, 0.6)",
          "rgb(154, 208, 245, 0.6)",
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
      <BackDiv>
        <MeasurementTitle>측정 결과 분석</MeasurementTitle>
        <UserMeasurementContext labels={labels} data={data} />
        <UserMeasurementContext labels={labels} data={data} />
        <UserMeasurementContext labels={labels} data={data} />
      </BackDiv>
    </>
  );
}
