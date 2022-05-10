import { useEffect, useState } from "react";
import axiosManager from "../../../util/axiosManager";
import { useRecoilState } from "recoil";
import { userState } from "../../../atoms/user";

import { BackDiv, DdayTitle } from "../../Presenter/UserDday/UseDdayPresent";
import DdayList from "./DdayList";


const UserDday = () => {
  const [ddays, setDdays] = useState([
    {
      id: 1,
      title: "중간고사",
      date: "2022-04-21",
    },
    {
      id: 2,
      title: "종강",
      date: "2022-06-22",
    },
  ]);

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
    
    const now = new Date()

  }, []);


  return (
    <>
      <BackDiv>
        <DdayTitle>디데이</DdayTitle>
        <DdayList dday={dday} />
      </BackDiv>
    </>
  );
};

export default UserDday;
