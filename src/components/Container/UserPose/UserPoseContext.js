import {
    BackDiv,
    Mtitle,
    Mtime,
    Mmchart,
  } from "../../Presenter/UserMeasurement/UserMeasurementContextPresenter";
import PChart from "./PChart";

const UserPoseContext = () => {
    return(
        <>
            <BackDiv>
                <Mtitle>2022.01.30.</Mtitle>
                <Mtime>학습시간 : 2:30:41</Mtime>
                <Mmchart>
                    <PChart/>
                </Mmchart>
            </BackDiv>
        </>
    );
};

export default UserPoseContext;