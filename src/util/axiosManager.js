import axios from "axios";

class AxiosManager {
  async axios(url, method, body) {
    const data = await axios({
      method,
      url: `http://www.monito.ml:3000${url}`,
      data: body,
    });
    return data.data;
  }
}

export default new AxiosManager();
