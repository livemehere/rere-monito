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

  const yesterdaydata = [138,24];
  const yesterdaysetsum = yesterdaydata.reduce(function add(sum, currValue){ // 일주일 평균 구하기
    return sum+currValue;
  },0);

  return (
    <>
      <BackDiv>
        <Mtitle>전날 집중도</Mtitle>
        <Mday>{yesterday}</Mday>
        <Mtime>학습시간 : {Math.floor(yesterdaysetsum / 60)}H {yesterdaysetsum.toFixed(2) % 60}M</Mtime>
        <Mmchart>
          <MChart labels={labels} data={data} />
        </Mmchart>
      </BackDiv>
    </>
  );
};

export default UserMeasurementContext;
