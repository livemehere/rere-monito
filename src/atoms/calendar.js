import { atom } from "recoil";

export const calendarState = atom({
  key: "calendar",
  default: [{
    id: 14,
    title: "캡스톤회의",
    start: "2022-05-27",
    end: "2022-05-28",
    // detail:"메모부터하자!"
  }]
});
