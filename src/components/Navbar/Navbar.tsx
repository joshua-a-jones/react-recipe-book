import "./Navbar.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import { useAuth } from "../../api/hooks/useAuth";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { useUserProfile } from "../../api/hooks/useUserProfile";

export default function Navbar() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { authState } = useAuth();
  const { userProfile } = useUserProfile();

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  const handleHamburgerClick = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  const handleSignInClick = () => {
    setIsLoginModalOpen(true);
    setIsHamburgerOpen(false);
  };

  return (
    <>
      <div className="navbar">
        <nav>
          <Link
            onClick={() => setIsHamburgerOpen(false)}
            to="/"
            className="logo"
          >
            <h1>
              {userProfile?.name ? `${userProfile.name}'s` : "My"} Recipe Book
            </h1>
          </Link>
          <div className="nav-controls">
            {!authState.user && (
              <p className="login-button" onClick={handleSignInClick}>
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
