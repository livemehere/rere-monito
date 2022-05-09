import DdayContents from "./DdayContents"

const DdayList = ({dday}) => {
    return (
        <>
        {dday.map(dday => (
            <DdayContents dday={dday} key={dday.id}/>
        ))}
        </>
    )
}

export default DdayList;