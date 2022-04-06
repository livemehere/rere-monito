import styled from "styled-components";

const CalendarBackDiv = styled.div`
    display:flex;
    justify-content: space-around;
    margin:2% 5%;
    padding:0;
    border-radius: 20px;
    background:linear-gradient(80deg,rgb(247, 202, 54,0.7), rgb(241, 163, 127,0.7));
`

const OnlyCalendar = styled.div`    
    justify-content:flex-start;
    background-color:rgba(255, 255, 255, 0.575);
    width:45%;
    padding:2%;
    //Button
    --fc-button-text-color: #fff;
    --fc-button-bg-color: rgb(241, 163, 127);
    --fc-button-border-color: #FFF;
    --fc-button-hover-bg-color: rgb(241, 163, 127);
    --fc-button-hover-border-color: #FFF;
    --fc-button-active-bg-color: rgb(199, 132, 101);
    --fc-button-active-border-color: rgb(199, 132, 101);
    
    --fc-bg-event-opacity: 0.3;
    --fc-non-business-color: white;
    --fc-today-bg-color: rgb(241, 163, 127,0.9);
    --fc-event-bg-color :  rgb(221, 197, 87, 0.5);
    --fc-event-border-color : rgb(196, 177, 96);
    --fc-event-text-color :  rgb(65, 34, 20);
`

const DetailCalendar = styled.div`
    // background-color:rgba(255, 255, 0, 1);
    width:45%;
    padding:2%;
`
export { CalendarBackDiv, OnlyCalendar, DetailCalendar };