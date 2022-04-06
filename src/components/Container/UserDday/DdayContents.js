import { 
    DdayContentsBox,
    ContentTable,
    Contenttr,
    ContenttdDate,
    ContenttdDday,
    Contenttd,
    DdayTitle,
    DdayDelete
} from "../../Presenter/UserDday/DdayContentsPresenter";
import{MdDelete} from 'react-icons/md'; 



const DdayContents = (dday) => {
    // const handleEventClick = (clickInfo) => {
    //     if (window.confirm(`'${clickInfo.event.title}' 일정을 삭제하시겠습니까?`)) {
    //         clickInfo.event.remove();
    //     }
    
    const handleEventClick = () => {
        window.confirm(`디데이을 삭제하시겠습니까?`)
    }


    const {title, date, goal} = dday;

    return (
        <>
        <DdayContentsBox>
            <DdayTitle className="title">제목</DdayTitle>

            <ContentTable border="1">
                <Contenttr>
                    <ContenttdDday rowSpan={2}>D-DAY</ContenttdDday>
                    <ContenttdDate className="date">0000-00-00</ContenttdDate>
                </Contenttr>
                <Contenttr>
                    <Contenttd className="goal">
                        시험만 잘쳐도 학점 반 이상은 따니까 미리미리 공부하자
                    </Contenttd>
                </Contenttr>
            </ContentTable>

            <DdayDelete>
                <MdDelete size="30"className="Delete" onClick={handleEventClick}/>
            </DdayDelete>

        </DdayContentsBox>
        </>
    );
};

export default DdayContents;