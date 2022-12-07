import { useEffect, useState } from "react";
import styles from "./Nav.module.css";
import DayNightToggle from "react-day-and-night-toggle";

function NavBar() {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const root = localStorage.getItem("theme");
    setTheme(root === "dark");
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.sitename}>TurkNet Case</div>
      <div>
        <DayNightToggle
          onChange={() => setTheme(!theme)}
          checked={theme}
          shadows={false}
        />
      </div>
    </nav>
  );
}

export default NavBar;
