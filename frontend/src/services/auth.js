import api from "../api";

export const loginUser = async (data) => {
  const res = await api.post("/api/users/login", data);
  localStorage.setItem("access_token", res.data.access_token);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post("/api/users/", data);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("access_token");
};
