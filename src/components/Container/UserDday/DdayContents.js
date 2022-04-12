import {
  DdayContentsBox,
  ContentTable,
  Contenttr,
  ContenttdDate,
  ContenttdDday,
  Contenttd,
  DdayTitle,
  DdayDelete,
} from "../../Presenter/UserDday/DdayContentsPresenter";
import { MdDelete } from "react-icons/md";

const DdayContents = ({ dday }) => {
  // const handleEventClick = (clickInfo) => {
  //     if (window.confirm(`'${clickInfo.event.title}' 일정을 삭제하시겠습니까?`)) {
  //         clickInfo.event.remove();
  //     }

  const handleEventClick = () => {
    window.confirm(`디데이을 삭제하시겠습니까?`);
    //TODO: DB에서 삭제
  };

  return (
    <>
      <DdayContentsBox>
        <DdayTitle className="title">{dday.title}</DdayTitle>
        <ContentTable border="1">
          <Contenttr>
            <ContenttdDday rowSpan={2}>D-DAY</ContenttdDday>
            <ContenttdDate className="date">{dday.date}</ContenttdDate>
          </Contenttr>
          <Contenttr>
            <Contenttd className="goal">{dday.goal}</Contenttd>
          </Contenttr>
        </ContentTable>

        <DdayDelete>
          <MdDelete size="30" className="Delete" onClick={handleEventClick} />
        </DdayDelete>
      </DdayContentsBox>
    </>
  );
};

export default DdayContents;
