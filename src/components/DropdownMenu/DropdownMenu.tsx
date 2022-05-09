import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../api/hooks/useAuth";
import { projectAuth } from "../../firebase/config";
import Searchbar from "../Searchbar/Searchbar";
import "./DropdownMenu.css";
import { useState } from "react";
import ModeSelector from "../ModeSelector/ModeSelector";

export interface DropdownMenuProps {
  toggleMenu: () => void;
}

export function DropdownMenu(props: DropdownMenuProps) {
  const { authState } = useAuth();
  const [showSearchbar, setShowSearchbar] = useState(false);
  const { toggleMenu } = props;
  const history = useHistory();

  const handleLogoutClick = () => {
    projectAuth.signOut();
    history.push("/");
    history.go(0);
    toggleMenu();
  };

  return (
    <div className="dropdown-menu">
      <ul>
        <li onClick={() => setShowSearchbar(!showSearchbar)}>Search</li>
        {showSearchbar && (
          <li>
            <Searchbar />
          </li>
        )}
        {authState.user && (
          <li>
            <Link onClick={toggleMenu} to="/create">
              Create Recipe
            </Link>
          </li>
        )}
        <li>
          <ModeSelector />
        </li>
        {authState.user && (
          <li>
            <p className="logout-button" onClick={handleLogoutClick}>
              Sign Out
            </p>
          </li>
        )}
        {!authState.user && (
          <li>
            <Link onClick={toggleMenu} to="/registration">
              Register New Account
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
