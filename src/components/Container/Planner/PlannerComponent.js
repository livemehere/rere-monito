import React from "react";
import { AlignTitle } from "../../Presenter/Calendar/CalendarTitlePresenter";
import PlannerBody from "./PlannerBody";

const PlannerComponent = () => {
    return (
        <>
            <AlignTitle>
                <h1>플래너</h1>
            </AlignTitle>
            <PlannerBody/>
        </>
    )
}

export default PlannerComponent;