import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: {
    id: 14,
    email: "test@gmail.com",
    password: "1234",
    name: "공태만",
    birth: "1998-11-30T00:00:00.000Z",
    job: "프리렌서",
    profile_img: null,
    iat: 1649769720,
  },
});
