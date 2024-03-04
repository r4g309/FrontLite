import { useRef, useState } from "react";
import { useRedirectIfAuthenticated } from "../hooks/useRedirect";
import { BASE_URL } from "../utils/constants";
import { getToken } from "../utils/token";
import "./registerCompany.css";

const normalize_nit = (nit: string) => nit.replace(/[. ]/g, "");
const normalize_phone = (phone: string) => phone.replace(/[+. ]/g, "");

export const RegisterCompany = () => {
  const navigator = useRedirectIfAuthenticated();
  const nameRef = useRef<HTMLInputElement>(null);
  const nitRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = {
      nit: normalize_nit(nitRef.current!.value),
      name: nameRef.current!.value,
      phone: normalize_phone(phoneRef.current!.value),
      direction: addressRef.current!.value,
      products: [],
    };
    const token = getToken();
    if (!token) {
      navigator("/login");
      return;
    }
    const response = await fetch(`${BASE_URL}/company/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(dataToSend),
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      navigator("/company");
    } else {
      setError(data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Register Company</legend>
          <label>
            <span>Company Name</span>
            <input type="text" ref={nameRef} required />
          </label>
          <label>
            <span>Comany NIT</span>
            <input type="text" ref={nitRef} required />
          </label>
          <label>
            <span>Company Address</span>
            <input type="text" ref={addressRef} required />
          </label>
          <label>
            <span>Company phone</span>
            <input type="number" ref={phoneRef} required />
          </label>
          <button type="submit">Register</button>
        </fieldset>
      </form>
      {error && <h4>{error}</h4>}
    </>
  );
};
