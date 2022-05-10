import axios from "axios";
import { login } from "./apiData";

class LoginUser {
  async axios(dispatch, email, password) {
    const data = await axios.post("http://115.85.180.240:3000/signIn", {
      email: email,
      password: password,
    });
    if (!data.data.result.coll) {
      console.log("회원이 없습니다");
      return;
    }

    const user_name = data.data.result.coll;

    console.log(`로그인 성공 ${user_name}`);
    await dispatch(login(email, password));
  }
}

const loginUser = new LoginUser();

export default loginUser;
