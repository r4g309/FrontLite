import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/token";

const useRedirectIfAuthenticated = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken() === null) {
      navigate("/");
    }
  }, [navigate]);
  return navigate;
};

export { useRedirectIfAuthenticated };
