import { atom } from "recoil";

export const timerOnOff = atom({
  key: "timer",
  default: false,
});

export const countState = atom({
  key: "newcount",
  default: 0,
});
