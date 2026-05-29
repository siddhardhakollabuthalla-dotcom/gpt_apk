export const isAdminLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;

  return localStorage.getItem("principalLoggedIn") === "true";
};

export const loginAdmin = () => {
  localStorage.setItem("principalLoggedIn", "true");
};

export const logoutAdmin = () => {
  localStorage.removeItem("principalLoggedIn");
};