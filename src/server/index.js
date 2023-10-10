import axios from "axios";
import { ENDPOINT, TOKEN } from "../constants";
import Cookies from "js-cookie";

export const request = axios.create({
  baseURL: `${ENDPOINT}api/v1/`,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${Cookies.get(TOKEN)}`
  }
});
