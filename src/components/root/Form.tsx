import { Dispatch, SetStateAction, useRef, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { LoginResponse } from "../../../types";
import { useRedirectIfAuthenticated } from "../../hooks/useRedirect";
import { BASE_URL } from "../../utils/constants";
import { setToken } from "../../utils/token";
import "./index.css";

interface AuthService {
  login: (username: string, password: string) => Promise<LoginResponse>;
}

const showErrorMessage = (
  error: string,
  setError: Dispatch<SetStateAction<string>>
) => {
  setError(error);
  setTimeout(() => {
    setError("");
  }, 3000);
};

const successLogin = (data: LoginResponse, navigator: NavigateFunction) => {
  setToken(data.token);
  return navigator("/company");
};

class AuthenticationService implements AuthService {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error((data.detail as string) || "Invalid values");
    }

    return data;
  }
}

export const Form = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useRedirectIfAuthenticated();
  const authService = new AuthenticationService();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailRef.current || !passwordRef.current) return;

    try {
      const data = await authService.login(
        emailRef.current.value,
        passwordRef.current.value
      );
      successLogin(data, navigate);
    } catch (error) {
      showErrorMessage(error as string, setError);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>Login In</legend>
        <label>
          <span>Username</span>
          <input type="text" ref={emailRef} placeholder="Goku" required />
        </label>
        <label>
          <span>Password </span>
          <input
            type={showPassword ? "text" : "password"}
            ref={passwordRef}
            placeholder="••••••••••"
            required
          />
          <button
            className="show-button"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </label>
        <button type="submit" className="send">
          Submit
        </button>
      </fieldset>
      {error && <span className="error-message">{error}</span>}
    </form>
  );
};
