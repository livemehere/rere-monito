import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: "loginState",
  default: false,
  ettects_UNSTABLE: [persistAtom],
});

export const IDState = atom({
  key: "id",
  default: "",
});

export const PWState = atom({
  key: "password",
  default: "",
});
