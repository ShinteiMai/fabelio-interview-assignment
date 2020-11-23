import Axios from "axios";
import { HTTP_METHODS } from "../globals";

const axios = Axios.create({
  baseURL: "https://stronkapp.com",
  // baseURL: "http://localhost:8080",
});

export const createApiRequest = async (
  url: string,
  method: HTTP_METHODS,
  data: any
) => {
  try {
    const response = await axios({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      data,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    const { statusCode, message } = err.response.data;
    throw new Error(JSON.stringify({ statusCode, message }));
  }
};

export default axios;
