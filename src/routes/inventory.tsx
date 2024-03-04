import { useRef } from "react";
import { NavBar } from "../components/navbar/navbar";
import { useRedirectIfAuthenticated } from "../hooks/useRedirect";
import { BASE_URL } from "../utils/constants";
import "./inventory.css";

export const Inventory = () => {
  useRedirectIfAuthenticated();
  const emailRef = useRef<HTMLInputElement>(null);
  const sendEmailFileRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current!.value;
    const response = await fetch(`${BASE_URL}/send_mail/${email}`);
    if (!response.ok) {
      alert("Error sending email");
    }
    emailRef.current!.value = "";
  };
  return (
    <>
      <NavBar />
      <h1>Inventory</h1>
      <form onSubmit={sendEmailFileRequest}>
        <fieldset>
          <legend>Send to email</legend>
          <label>
            <span>Email</span>
            <input type="email" ref={emailRef} required />
          </label>
          <button className="send-email" type="submit">
            Send
          </button>
        </fieldset>
      </form>
      <button className="download">
        <a href={`${BASE_URL}/generate_pdf`}>Inventory File</a>
      </button>
    </>
  );
};
