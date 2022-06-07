import axios from "axios";

class AxiosManager {
  async axios(url, method, body) {
    const data = await axios({
      method,
      url: `https://monito.ml${url}`,
      data: body && body,
    });

    if (data.status >= 200 && data.status <= 299) {
      return data.data;
    } else {
      return data;
    }
  }
}

const axiosManager = new AxiosManager();

export default axiosManager;
