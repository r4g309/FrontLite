export const getToken = () => {
  const token = localStorage.getItem("token");
  return !token ? null : `Token ${token}`;
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
