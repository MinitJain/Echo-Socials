const getBaseURL = () => {
  const url = import.meta.env.VITE_API_URL;
  if (!url || url === "undefined" || url === "") {
    return "/api/v1";
  }
  return url;
};

const API_BASE_URL = getBaseURL();

export const USER_API_END_POINT = `${API_BASE_URL}/user`;
export const TWEET_API_END_POINT = `${API_BASE_URL}/tweet`;
export const NOTIFICATION_API_END_POINT = `${API_BASE_URL}/notification`;
