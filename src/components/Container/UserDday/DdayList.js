import DdayContents from "./DdayContents"

const DdayList = ({dday}) => { // 안씀
    return (
        <>
        {dday.map(dday => (
            <DdayContents dday={dday} key={dday.id}/>
        ))}
        </>
    )
}

export default DdayList;