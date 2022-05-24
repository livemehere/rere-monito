import {
  BackDiv,
  Mtitle,
  Mtime,
  Mday,
  Mmchart,
} from "../../Presenter/UserMeasurement/UserMeasurementContextPresenter";
import MChart from "./MChart";

import moment from "moment";

const UserMeasurementContext = ({ labels, data }) => {

  const yesterday = moment().subtract(1,'days').format('YYYY-MM-DD')
  return (
    <>
      <BackDiv>
        <Mtitle>전날 집중도</Mtitle>
        <Mday>{yesterday}</Mday>
        <Mtime>학습시간 : 2:30:41</Mtime>
        <Mmchart>
          <MChart labels={labels} data={data} />
        </Mmchart>
      </BackDiv>
    </>
  );
};

export default UserMeasurementContext;
