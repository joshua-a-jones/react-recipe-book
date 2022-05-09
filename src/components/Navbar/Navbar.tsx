import "./Navbar.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import { useAuth } from "../../api/hooks/useAuth";
import { projectAuth } from "../../firebase/config";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";

export default function Navbar() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { authState } = useAuth();

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  const handleHamburgerClick = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  console.log(projectAuth.currentUser);
  return (
    <>
      <div className="navbar">
        <nav>
          <Link to="/" className="logo">
            <h1>My Recipe Book</h1>
          </Link>
          <div className="nav-controls">
            {!authState.user && (
              <p
                className="login-button"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Sign In
              </p>
            )}
            <GiHamburgerMenu
              className="hamburger-button"
              onClick={handleHamburgerClick}
            />
          </div>
        </nav>
      </div>
      {isHamburgerOpen && (
        <DropdownMenu toggleMenu={() => setIsHamburgerOpen(false)} />
      )}
      {isLoginModalOpen && (
        <LoginModal handleClickCloseButton={handleCloseLoginModal} />
      )}
    </>
  );
}
