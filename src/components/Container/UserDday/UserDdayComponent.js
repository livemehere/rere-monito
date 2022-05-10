import { useEffect, useState } from "react";
import axiosManager from "../../../util/axiosManager";
import { useRecoilState } from "recoil";
import { userState } from "../../../atoms/user";
import DdayContents from "./DdayContents";
import { AlignTitlee } from "../../Presenter/Calendar/CalendarTitlePresenter";

import moment from "moment";
import { BackDiv, DdayTitle } from "../../Presenter/UserDday/UseDdayPresent";

const UserDday = () => {
  const [dday, setDday] = useState([]);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    // TODO: DB에서 데이터 불러와서 setDdays()
    axiosManager.axios(`/calendar/${user.id}`, "GET").then((datas) => {
      const initialData = [];
      if (!datas){
        datas.forEach((data) => {
          initialData.push({
            id: data.id,
            title: data.title,
            start: data.startDate,
            end: data.endDate,
          });
        });
        setDday(initialData.sort((a,b)=> {return moment(a.start).diff(b.start, "days")}));
      }    
    });


  }, []);

  
  console.log(dday);
  return (
    <>
      <AlignTitlee>디데이</AlignTitlee>
      <BackDiv>
        {dday && dday.map((dday) => (
          <DdayContents dday={dday} key={dday.id} />
        ))}
      </BackDiv>
    </>
  );
};

export default UserDday;