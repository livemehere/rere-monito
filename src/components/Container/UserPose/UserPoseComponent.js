import {
    MeasurementTitle,
    BackDiv,
    
  } from "../../Presenter/UserMeasurement/UserMeasurementPresenter";
import UserPoseContext from "./UserPoseContext";

const UserPoseComponent = () => {
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

export default UserPoseComponent;