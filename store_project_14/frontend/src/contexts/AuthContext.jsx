import { createContext, useEffect, useState } from "react";
import { privateApiClient, publicApiClient } from "../api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const registration = async (data) => {
    try {
      await publicApiClient.post("auth/registration/", data);
      navigate("/login")
    } catch (error) {
      error.response?.data
        ? console.error(error.response.data)
        : console.error(error);
    }
  };

  const login = async (data) => {
    try {
      const response = await publicApiClient.post("auth/token/obtain/", data);
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      await fetchUser();
      navigate("/");
    } catch (error) {
      error.response?.data
        ? console.error(error.response.data)
        : console.error(error);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null)
      setAuthenticated(false)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await privateApiClient.get("auth/user_profile/");
      setUser(response.data);
    } catch (error) {
      error.response?.data
        ? console.error(error.response.data)
        : console.error(error);
    } finally {
      setAuthenticated(true);
    }
  };

  const updateUserData = async (data) => {
    try {
      const response = await privateApiClient.patch("auth/user_profile/", data);
      setUser(response.data)
    } catch (error) {
      error.response?.data
        ? console.error(error.response.data)
        : console.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        registration,
        login,
        logout,
        fetchUser,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
