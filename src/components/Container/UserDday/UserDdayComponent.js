import { useEffect, useState } from "react";
import axiosManager from "../../../util/axiosManager";
import { useRecoilState } from "recoil";
import { userState } from "../../../atoms/user";

import { BackDiv, DdayTitle } from "../../Presenter/UserDday/UseDdayPresent";
import DdayContents from "./DdayContents"

import moment from 'moment';


const UserDday = () => {

  const [dday, setDday] = useState([]);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    // TODO: DB에서 데이터 불러와서 setDdays()
    axiosManager.axios(`/calendar/${user.id}`, "GET").then((datas) => {
      const initialData = [];
      console.log("캘린더",datas);
      datas.forEach((data) => {
        initialData.push({
          id: data.id,
          title: data.title,
          start: data.startDate,
          end: data.endDate,
        });
      });
      setDday(initialData);
    });
    

  }, []);

  return (
    <>
      <BackDiv>
        <DdayTitle>디데이</DdayTitle>
        {dday.map(dday => (
            <DdayContents dday={dday} key={dday.id}/>
        ))}
      </BackDiv>
    </>
  );
};

export default UserDday;
