// Funções utilitárias para manipulação do localStorage

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getEmail = () => {
  return localStorage.getItem("email");
};

export const setEmail = (email) => {
  localStorage.setItem("email", email);
};

export const removeEmail = () => {
  localStorage.removeItem("email");
};

export const clearAuthData = () => {
  removeToken();
  removeEmail();
};
