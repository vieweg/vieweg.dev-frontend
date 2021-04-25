import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_LOCAL_URL
      : process.env.REACT_APP_API_URL,
  timeout: 120000,
});

export const fetcher = (url: string) => api.get(url).then((res) => res.data);
