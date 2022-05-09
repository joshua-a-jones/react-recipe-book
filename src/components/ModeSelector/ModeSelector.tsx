import "./ModeSelector.css";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../../api/hooks/useTheme";

export default function ModeSelector() {
  const { themeStyle, changeMode } = useTheme();

  const toggleMode = () => {
    const newMode = themeStyle.mode === "light" ? "dark" : "light";
    changeMode(newMode);
  };

  return (
    <div className="mode-selector" onClick={toggleMode}>
      <span>{themeStyle.mode === "light" ? "Dark Mode" : "Light Mode"}</span>
      {themeStyle.mode === "light" ? (
        <MdOutlineDarkMode />
      ) : (
        <MdOutlineLightMode />
      )}
    </div>
  );
}
