import {
    BackDiv,
    Mtitle,
    Mtime,
    Mmchart,
  } from "../../Presenter/UserMeasurement/UserMeasurementContextPresenter";
import MChart from "./MChart";

const UserMeasurementContext = () => {
    return (
        <>
            <BackDiv>
                <Mtitle>2022.01.30.</Mtitle>
                <Mtime>학습시간 : 2:30:41</Mtime>
                <Mmchart>
                    <MChart/>
                </Mmchart>
            </BackDiv>
        </>
    );
};

export default UserMeasurementContext;