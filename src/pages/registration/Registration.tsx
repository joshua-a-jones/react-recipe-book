import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "../../api/hooks/useTheme";
import { projectAuth } from "../../firebase/config";
import "./Registration.css";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const history = useHistory();
  const { themeStyle } = useTheme();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPasswordValid && isEmailValid) {
      projectAuth
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          history.push("/");
        });
    }
  };

  const handlEmailInputChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setIsEmailValid(!e.currentTarget.validity.typeMismatch);
  };

  const handlPasswordInputChange = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    setIsPasswordValid(!e.currentTarget.validity.patternMismatch);
  };

  return (
    <div className={`registration ${themeStyle.mode}`}>
      <h2 className="page-title">Create a new Account</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          <span>Email:</span>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => handlEmailInputChange(e)}
            required
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => handlPasswordInputChange(e)}
            minLength={6}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
