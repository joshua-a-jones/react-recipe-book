import "./Navbar.css";
import { Link } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTheme } from "../../api/hooks/useTheme";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Navbar() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="logo">
          <h1>My Recipe Book</h1>
        </Link>
        <div className="h-stack desktop-nav">
          <Searchbar />
          <Link to="/create">Create Recipe</Link>
        </div>

        <div className="mobile-nav">
          <GiHamburgerMenu onClick={handleHamburgerClick} />
        </div>
      </nav>
      {isHamburgerOpen && (
        <div className="hamburger-menu">
          <Searchbar />
          <Link to="/create">Create Recipe</Link>
        </div>
      )}
    </div>
  );
}
