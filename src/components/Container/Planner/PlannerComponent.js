import React from "react";
import { AlignTitle } from "../../Presenter/Calendar/CalendarTitlePresenter";
import PlannerBody from "./PlannerBody";

const Planner = () => {
    return (
        <>
            <AlignTitle>
                <h1>플래너</h1>
            </AlignTitle>
            <PlannerBody/>
        </>
    )
}

export default Planner;