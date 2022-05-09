import { BackDiv, Mtitle, Mtime, Mmchart } from "../../Presenter/UserMeasurement/UserMeasurementContextPresenter";
import MChart from "./MChart";

const UserMeasurementContext = ({ labels, data }) => {
  return (
    <>
      <BackDiv>
        <Mtitle>2022.05.10.</Mtitle>
        <Mtime>학습시간 : 2:30:41</Mtime>
        <Mmchart>
          <MChart labels={labels} data={data} />
        </Mmchart>
      </BackDiv>
    </>
  );
};

export default UserMeasurementContext;
