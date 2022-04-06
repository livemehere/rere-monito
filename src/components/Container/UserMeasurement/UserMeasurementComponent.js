import {
    MeasurementTitle,
    BackDiv,
    
  } from "../../Presenter/UserMeasurement/UserMeasurementPresenter";
import UserMeasurementContext from "./UserMeasurementContext";

const UserMeasurement = () => {
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

export default UserMeasurement;