const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';
const ROLE_KEY = 'user_role';

export const storeAuthData = (token, userData, role) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
  localStorage.setItem(ROLE_KEY, role);
};

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserData = () => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};
export const getUserRole = () => localStorage.getItem(ROLE_KEY);
export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ROLE_KEY);
};
export const isAuthenticated = () => !!getAuthToken();
export const isAdmin = () => getUserRole() === 'Admin';
