import {
    MeasurementTitle,
    BackDiv,
    
  } from "../../Presenter/UserMeasurement/UserMeasurementPresenter";
import UserMeasurementContext from "./UserMeasurementContext";

export default function UserMeasurement() {
    return (
        <>
        <BackDiv>
            <MeasurementTitle>측정 결과 분석</MeasurementTitle>
            <UserMeasurementContext />
            <UserMeasurementContext />
        </BackDiv>
            
        </>
    );
};