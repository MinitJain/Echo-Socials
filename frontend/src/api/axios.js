// Im asking AI to write some comments for this file cause it seemed complex to me while building, so I will try to keep it simple for ya'll

import axios from "axios";

const getBaseURL = () => {
  const url = import.meta.env.VITE_API_URL;

  // If we have a hardcoded URL (like Render), use it.
  if (url && url !== "undefined" && url !== "") {
    return url;
  }

  // If we are on Localhost, we NEED to point to the actual port 8080
  if (window.location.hostname === "localhost") {
    return "http://localhost:8080/api/v1";
  }

  // Fallback for Vercel Production Proxy
  return "/api/v1";
};

const API = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

export default API;
