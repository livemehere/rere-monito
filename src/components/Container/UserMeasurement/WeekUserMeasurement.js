import {
    BackDivv,
    Mtitle,
    Mtime,
    Mmchart,
  } from "../../Presenter/UserMeasurement/UserMeasurementContextPresenter";
  import WeekChart from "./WeekChart";
  
  import moment from "moment";
  
  const WeekUserMeasurement = ({ labels, data }) => {
  
    const weekstart =  moment().subtract(7,'days').format("YYYY-MM-DD");
    const weekend =  moment().subtract(1,'days').format("YYYY-MM-DD");

    return (
        <>
          <BackDivv>
            <Mtitle>지난 일주일 공부시간</Mtitle>
            <Mtime>{weekstart} ~ {weekend}</Mtime>
            <Mmchart>
              <WeekChart labels={labels} data={data} />
            </Mmchart>
          </BackDivv>
        </>
      );
  };
  
  export default WeekUserMeasurement;