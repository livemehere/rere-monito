import DdayContents from "./DdayContents"

const DdayList = ({ddays}) => {
    return (
        <>
        {ddays.map(dday => (
            <DdayContents dday={dday} key={dday.id}/>
        ))}
        </>
    )
}

export default DdayList;