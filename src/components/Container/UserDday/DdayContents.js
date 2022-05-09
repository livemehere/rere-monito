import {
  DdayContentsBox,
  ContenttdDate,
  ContenttdDday,
  DdayTitle,
} from "../../Presenter/UserDday/DdayContentsPresenter";

const DdayContents = ({ dday }) => {
  // const handleEventClick = (clickInfo) => {
  //     if (window.confirm(`'${clickInfo.event.title}' 일정을 삭제하시겠습니까?`)) {
  //         clickInfo.event.remove();
  //     }

  return (
    <>
      <DdayContentsBox>
        <DdayTitle className="title">{dday.title}</DdayTitle>
        <ContenttdDate className="date">{dday.start}</ContenttdDate>
        <ContenttdDday>D-DAY</ContenttdDday>
      </DdayContentsBox>
    </>
  );
};

export default DdayContents;
