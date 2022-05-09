import { FormEvent, useState } from "react";
import { MdClose } from "react-icons/md";
import { projectAuth } from "../../firebase/config";
import { useAuth } from "../../api/hooks/useAuth";
import "./LoginModal.css";
import { Link } from "react-router-dom";
import { FirebaseError } from "@firebase/util";

export interface LoginModalProps {
  handleClickCloseButton: () => void;
}

export default function LoginModal(props: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const [loginError, setLoginError] = useState<string | null>();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );
      if (userCredential.user) {
        setUser(userCredential.user);
      }

      props.handleClickCloseButton();
    } catch (error) {
      if (
        (error as FirebaseError).code === "auth/wrong-password" ||
        (error as FirebaseError).code === "auth/user-not-found"
      ) {
        setLoginError("The password or email you entered is invalid");
      } else if ((error as FirebaseError).code === "auth/too-many-requests") {
        setLoginError(
          "You have made too many login attempts in a short period of time. Please wait a while before trying to login again, or reset your password."
        );
      }
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <MdClose
          className="close-button"
          onClick={props.handleClickCloseButton}
        />
        <form onSubmit={handleFormSubmit}>
          <h2>Sign In</h2>
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
            />
          </label>
          {loginError && <span>{loginError}</span>}
          <button type="submit">Sign In</button>
        </form>
        <span>Don't have an account? </span>
        <Link onClick={props.handleClickCloseButton} to="/registration">
          Click here to register
        </Link>{" "}
        <br></br>
        <span>Forgot your password? </span>
        <Link onClick={props.handleClickCloseButton} to="/">
          Click here to reset it.
        </Link>
      </div>
    </div>
  );
}
