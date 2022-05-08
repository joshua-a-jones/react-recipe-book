import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTheme } from "../../api/hooks/useTheme";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import { useAuth } from "../../api/hooks/useAuth";
import { projectAuth } from "../../firebase/config";

export default function Navbar() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { authState } = useAuth();
  const history = useHistory();

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  const handleHamburgerClick = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  const handleLogoutClick = () => {
    projectAuth.signOut();
    history.go(0);
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
            {authState.user && (
              <p className="logout-button" onClick={handleLogoutClick}>
                Sign Out
              </p>
            )}
            <GiHamburgerMenu
              className="hamburger-button"
              onClick={handleHamburgerClick}
            />
          </div>
        </nav>
        {isHamburgerOpen && (
          <div className="hamburger-menu">
            <Searchbar />
            <Link to="/create">Create Recipe</Link>
          </div>
        )}
      </div>
      {isLoginModalOpen && (
        <LoginModal handleClickCloseButton={handleCloseLoginModal} />
      )}
    </>
  );
}
