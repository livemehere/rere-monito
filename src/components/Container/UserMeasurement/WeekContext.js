import {
    BackDivv,
    Mtitle,
    Mtime,
    Mmchart,
  } from "../../Presenter/UserMeasurement/UserMeasurementContextPresenter";
import WeekChart from "./WeekChart";


  const WeekContext = ({labels, data}) =>{
      return(
          <BackDivv>
              <Mtitle>일주일 평균</Mtitle>
              <Mtime>2022.05.23 ~ 2022.05.30</Mtime>
              <Mmchart>
                <WeekChart labels={labels} data={data}/>
              </Mmchart>   
          </BackDivv>
      );
  };

  export default WeekContext;