import {
  BackDiv,
  BackDivv,
  Mtitle,
  Mtime,
  Mday,
  Mmchart,
} from "../../Presenter/UserMeasurement/UserMeasurementContextPresenter";
import MChart from "./MChart";

import moment from "moment";

const UserMeasurementContext = ({ labels, data, weeklabels, weekdata, yesterdaysetsum }) => {

  const yesterday = moment().subtract(1,'days').format('YYYY-MM-DD');

  const weekstart =  moment().subtract(7,'days').format("YYYY-MM-DD");
  const weekend =  moment().subtract(1,'days').format("YYYY-MM-DD");

  if(Math.floor(yesterdaysetsum / 60)===0){
    if(Math.floor((yesterdaysetsum/60)-(Math.floor(yesterdaysetsum / 60/60)*60))===0){
      if(Math.floor(yesterdaysetsum - (Math.floor(yesterdaysetsum /60/60)*60*60) - (Math.floor((yesterdaysetsum/60)-(Math.floor(yesterdaysetsum /60/60)*60))*60))===0){
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
              <Mtime>학습시간 : {Math.floor(yesterdaysetsum - (Math.floor(yesterdaysetsum /60/60)*60*60) - (Math.floor((yesterdaysetsum/60)-(Math.floor(yesterdaysetsum /60/60)*60))*60))}S</Mtime>
              <Mmchart>
                <MChart labels={labels} data={data} weeklabels={weeklabels} weekdata={weekdata} />
              </Mmchart>
            </BackDiv>

            <BackDivv>
            <Mtitle>지난 일주일 공부시간</Mtitle>
            <Mtime>{weekstart} ~ {weekend}</Mtime>
            </BackDivv>
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
            <Mtime>학습시간 : {Math.floor((yesterdaysetsum/60)-(Math.floor(yesterdaysetsum / 60/60)*60))}M {Math.floor(yesterdaysetsum - (Math.floor(yesterdaysetsum /60/60)*60*60) - (Math.floor((yesterdaysetsum/60)-(Math.floor(yesterdaysetsum /60/60)*60))*60))}S</Mtime>
            <Mmchart>
                <MChart labels={labels} data={data} weeklabels={weeklabels} weekdata={weekdata} />
              </Mmchart>
            </BackDiv>

            <BackDivv>
            <Mtitle>지난 일주일 공부시간</Mtitle>
            <Mtime>{weekstart} ~ {weekend}</Mtime>
            </BackDivv>
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
          <Mtime>학습시간 : {Math.floor(yesterdaysetsum / 60/60)}H {Math.floor((yesterdaysetsum/60)-(Math.floor(yesterdaysetsum /60/60)*60))}M {Math.floor(yesterdaysetsum - (Math.floor(yesterdaysetsum /60/60)*60*60) - (Math.floor((yesterdaysetsum/60)-(Math.floor(yesterdaysetsum /60/60)*60))*60))}S</Mtime>
          <Mmchart>
                <MChart labels={labels} data={data} weeklabels={weeklabels} weekdata={weekdata} />
            </Mmchart>
            </BackDiv>

            <BackDivv>
            <Mtitle>지난 일주일 공부시간</Mtitle>
            <Mtime>{weekstart} ~ {weekend}</Mtime>
            </BackDivv>
      </>
    );
  }
};

export default UserMeasurementContext;
