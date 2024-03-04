import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/navbar/navbar";
import { Form } from "../components/root/Form";
import { getToken } from "../utils/token";

export const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken() === null) {
      navigate("/");
    } else {
      navigate("/products");
    }
  }, [navigate]);

  return (
    <>
      <NavBar />
      <Form />
    </>
  );
};
