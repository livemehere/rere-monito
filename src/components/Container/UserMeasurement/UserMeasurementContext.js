import {
  BackDiv,
  Mtitle,
  Mtime,
  Mday,
  Mmchart,
} from "../../Presenter/UserMeasurement/UserMeasurementContextPresenter";
import MChart from "./MChart";

import moment from "moment";

const UserMeasurementContext = ({ labels, data, yesterdaysetsum }) => {

  const yesterday = moment().subtract(1,'days').format('YYYY-MM-DD')

  if(Math.floor(yesterdaysetsum / 60)===0){
    if(yesterdaysetsum.toFixed(0) % 60 % 60===0){
      if(yesterdaysetsum.toFixed(0)  % 60 % 60% 60===0){
        return (
          <>
            <BackDiv>
              <div>전날 공부 데이터가 존재하지 않습니다.</div>
            </BackDiv>
          </>
        );
      }
      else{
        return (
          <>
            <BackDiv>
              <Mtitle>전날 집중도</Mtitle>
              <Mday>{yesterday}</Mday>
              <Mtime>학습시간 : {yesterdaysetsum.toFixed(2) *60 % 60}S</Mtime>
              <Mmchart>
                <MChart labels={labels} data={data} />
              </Mmchart>
            </BackDiv>
          </>
        );
      }
      
    }
    else{
      return (
        <>
          <BackDiv>
            <Mtitle>전날 집중도</Mtitle>
            <Mday>{yesterday}</Mday>
            <Mtime>학습시간 : {Math.floor(yesterdaysetsum)}M {yesterdaysetsum.toFixed(2) *60 % 60}S</Mtime>
            <Mmchart>
              <MChart labels={labels} data={data} />
            </Mmchart>
          </BackDiv>
        </>
      );
    }
    
  }
  else{
    return (
      <>
        <BackDiv>
          <Mtitle>전날 집중도</Mtitle>
          <Mday>{yesterday}</Mday>
          <Mtime>학습시간 : {Math.floor(yesterdaysetsum / 60)}H {Math.floor(yesterdaysetsum)}M {yesterdaysetsum.toFixed(2) *60 % 60}S</Mtime>
          <Mmchart>
            <MChart labels={labels} data={data} />
          </Mmchart>
        </BackDiv>
      </>
    );
  }
};

export default UserMeasurementContext;
