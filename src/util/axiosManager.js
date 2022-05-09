import axios from "axios";

class AxiosManager {
  async axios(url, method, body) {
    const data = await axios({
      method,
      url: `http://15.164.167.169:3000${url}`,
      data: body && body,
    });
    return data.data;
  }
}

class LoginUser {
  async axios(dispatch, email, pw) {
    const authRes = await axios.post("http://localhost:3000", {
      email: email,
      pw: pw,
    });

    if (!authRes.data.result.coll) {
      console.log("회원이 없습니다");
      return;
    }

    const user_name = "값을 넣으세요";

    console.log("로그인 성공");
  }
}

const axiosManager = new AxiosManager();
const loginUser = new LoginUser();

export { AxiosManager, LoginUser };
