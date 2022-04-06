import FullCalendar from "@fullcalendar/react";
import React from "react";
import { AlignTitle } from "../../Presenter/Calendar/CalendarTitlePresenter";

const CalendarTitle = () => {

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    // const year_month = year + "년" + (month + 1)"월";

    return (
        <>
            <AlignTitle>
                <div className="title-now-month">
                    <ul>
                        
                    {/* <li><input type = "button" value = "<" /></li>
                    <li className="today-title"> {today.getFullYear()}년 {today.getMonth()+1}월 </li>
                    <li><input type="button" value=">"/></li> */}
                    </ul>
                </div>
            </AlignTitle>

        </>
    )

}

export default CalendarTitle; 