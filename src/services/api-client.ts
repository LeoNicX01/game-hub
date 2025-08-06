import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "0f671a0143084e94ae123f4cb859677f",
  },
});
