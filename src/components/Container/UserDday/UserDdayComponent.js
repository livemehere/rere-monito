import { useEffect, useState } from "react";
import { BackDiv, DdayTitle } from "../../Presenter/UserDday/UseDdayPresent";
import DdayContents from "./DdayContents";
import DdayList from "./DdayList";
import MakeDday from "./MakeDday";
import MakeDdayBtn from "./MakeDdayBtn";

const UserDday = () => {
  const [ddays, setDdays] = useState([
    {
      id: 1,
      title: "중간고사",
      date: "2022-04-21",
      goal: "미리미리 공부하자",
    },
    {
      id: 2,
      title: "종강",
      date: "2022-06-22",
      goal: "종강하고싶다",
    },
  ]);

  useEffect(() => {
    // TODO: DB에서 데이터 불러와서 setDdays()
  }, []);

  return (
    <>
      <BackDiv>
        <DdayTitle>디데이 설정</DdayTitle>
        <DdayList ddays={ddays} />
        <MakeDday />
        <MakeDdayBtn />
      </BackDiv>
    </>
  );
};

export default UserDday;
