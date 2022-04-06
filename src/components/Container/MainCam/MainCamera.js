import { AlignTitle } from "../../Presenter/Calendar/CalendarTitlePresenter.js";
import {
    Div, 
    CamStates, 
    Block, 
    CamSide,
  } from "../../Presenter/MainCam/MainCam.js";

  
  const MainCam = () => {
    return (
      <Div>
            <AlignTitle>
                <h1>학습</h1>
            </AlignTitle>
          
          <Block>            
            <CamSide />
          </Block>
          <br></br>
          <br></br>
      </Div>
    );
  };
  
  export default MainCam;
  