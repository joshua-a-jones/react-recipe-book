import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "../../api/hooks/useTheme";
import { projectAuth } from "../../firebase/config";
import "./Registration.css";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { themeStyle } = useTheme();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    projectAuth.createUserWithEmailAndPassword(email, password).then((cred) => {
      history.push("/");
    });
  };

  return (
    <div className={`registration-form-container ${themeStyle.mode}`}>
      <h2>Create a new Account</h2>
      <form className="registration-form" onSubmit={handleFormSubmit}>
        <label>
          <span>Email</span>
          <input
            id="email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
