import "./Searchbar.css";
import { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "../../api/hooks/useTheme";
import { MdSearch } from "react-icons/md";

export default function Searchbar() {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const { themeStyle } = useTheme();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchText !== "") {
      history.push(`/search?q=${encodeURIComponent(searchText)}`);
      setSearchText("");
    }
  };
  return (
    <div className={`searchbar ${themeStyle.mode}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <button className="search-button">
          <MdSearch className="search-icon" />
        </button>
      </form>
    </div>
  );
}
