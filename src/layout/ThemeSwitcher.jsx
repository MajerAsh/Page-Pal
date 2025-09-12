import { useState, useEffect } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <button
      className="theme-switcher-btn"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
