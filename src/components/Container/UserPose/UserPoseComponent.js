import {
    MeasurementTitle,
    BackDiv,
    
  } from "../../Presenter/UserMeasurement/UserMeasurementPresenter";
import UserPoseContext from "./UserPoseContext";

export default function UserPose() {
    return (
        <>
            <BackDiv>
                <MeasurementTitle>자세</MeasurementTitle>
                <UserPoseContext/>
                <UserPoseContext/>
            </BackDiv>
        </>
    );
};