import {
  DdayContentsBox,
  ContenttdDate,
  ContenttdDday,
  DdayTitle,
} from "../../Presenter/UserDday/DdayContentsPresenter";
import moment from "moment";

const DdayContents = ({ dday }) => {
  const today = moment().format("YYYY-MM-DD"); // 오늘 날짜
  const startday = moment(dday.start).format("YYYY-MM-DD"); // 일정 시작 날짜
  const endday = moment(dday.end).format("YYYY-MM-DD"); // 일정 마지막 날짜

  const ddayy = moment(dday.start).diff(today, "days");

  if (moment(startday).isSame(endday) === true) {
    // 시작날짜 끝날짜 같을 시 표시방법
    if (moment(today).isSameOrBefore(endday) === true) {
      // 오늘날짜가 끝날짜와 같거나 이전
      if (moment(today).isBefore(startday) === true) {
        // 오늘날짜가 시작날짜 이전
        return (
          <DdayContentsBox>
            <DdayTitle className="title">{dday.title}</DdayTitle>
            <ContenttdDate className="date">{startday}</ContenttdDate>
            <ContenttdDday>D-{ddayy}</ContenttdDday>
          </DdayContentsBox>
        );
      } else if (moment(today).isSameOrAfter(startday) === true) {
        // 오늘날짜가 시작날짜 같거나 이후
        return (
          <DdayContentsBox>
            <DdayTitle className="title">{dday.title}</DdayTitle>
            <ContenttdDate className="date">{startday}</ContenttdDate>
            <ContenttdDday>D-DAY</ContenttdDday>
          </DdayContentsBox>
        );
      }
    }
  } else {
    // 시작날짜 끝날짜 다를 시 표시방법
    if (moment(today).isSameOrBefore(endday) === true) {
      // 오늘날짜가 끝날짜와 같거나 이전
      if (moment(today).isBefore(startday) === true) {
        // 오늘날짜가 시작날짜 이전
        return (
          <>
            <DdayContentsBox>
              <DdayTitle className="title">{dday.title}</DdayTitle>
              <ContenttdDate className="date">
                {startday} ~ {endday}
              </ContenttdDate>
              <ContenttdDday>D-{ddayy}</ContenttdDday>
            </DdayContentsBox>
          </>
        );
      } else if (moment(today).isSameOrAfter(startday) === true) {
        // 오늘날짜가 시작날짜 같거나 이후
        return (
          <>
            <DdayContentsBox>
              <DdayTitle className="title">{dday.title}</DdayTitle>
              <ContenttdDate className="date">
                {startday} ~ {endday}
              </ContenttdDate>
              <ContenttdDday>D-DAY</ContenttdDday>
            </DdayContentsBox>
          </>
        );
      }
    }
  }
};

export default DdayContents;
