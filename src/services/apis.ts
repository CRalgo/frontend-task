import axios from "axios";
import { BASE_API_URL } from "../utils/constants";

export const fetchAboutUs = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/info`);
    return response.data;
  } catch (e) {
    if(!axios.isCancel(e)) {
      throw e;
    }
  }

  return {};
};

export const login = async (email: string, password: string) => {
  const payload = { email, password };
  try {
    const response = await axios.post(`${BASE_API_URL}/auth/login`, payload);
    return response.data;
  } catch (e) {
    if(!axios.isCancel(e)) {
      throw e;
    }
  }

  return {};
};

export const fetchProfile = async (token: string | boolean) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/profile?token=${token}`);
    return response.data;
  } catch (e) {
    if(!axios.isCancel(e)) {
      throw e;
    }
  }

  return {};
};

export const fetchAuthor = async (token: string | boolean) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/author?token=${token}`);
    return response.data;
  } catch (e) {
    if(!axios.isCancel(e)) {
      throw e;
    }
  }

  return {};
};

export const fetchQuote = async (token: string | boolean, autherId: number | string | null) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/quote?token=${token}&autherId=${autherId}`);
    return response.data;
  } catch (e) {
    if(!axios.isCancel(e)) {
      throw e;
    }
  }

  return {};
};

export const logout = async (token: string | boolean) => {
  try {
    const response = await axios.delete(`${BASE_API_URL}/logout?token=${token}`);
    return response.data;
  } catch (e) {
    if(!axios.isCancel(e)) {
      throw e;
    }
  }

  return {};
};