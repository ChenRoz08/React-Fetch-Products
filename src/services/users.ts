// eyJhbGciOiJIUzI1NiJ9.Q2hlbi5yb3ppbHlvQGdtYWlsLmNvbQ.M2F4MyNJepo2f9T4abzd_ -
//   WTjgAmD5TetTk51uij3nY;

import axios from "axios";
import { User } from "../models/users";

const url = import.meta.env.VITE_API_URL;

export async function login(body: { email: string; password: string }) {
  try {
    const { data } = await axios.post(`${url}/login`, { ...body });
    if (!data.status) throw data.error;

    return data.token as string;
  } catch (error) {
    return null;
  }
}

export async function getUser(token: string) {
  try {
    const { data } = await axios.get(`${url}/user`, { headers: { token } });

    if (!data.status) throw data.error;
    return data.user as User;
  } catch (error) {
    console.error(error);
    return null;
  }
}
