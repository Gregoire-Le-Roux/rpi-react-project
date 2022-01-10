import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import classes from './Layout.module.css';

const Layout = () => {
  const [active, setActive] = useState("")

  const handleClick = (link) => {
    setActive(link);
  }

  return (
    <>
      <nav className={classes.navbar}>
        <ul>
          <li>
            <Link className={active === "" ? classes.active : null} to="/" onClick={() => handleClick("")} >Livres</Link>
          </li>
          <li>
            <Link className={active === "author" ? classes.active : null} to="/auteur" onClick={() => handleClick("author")}>Auteurs</Link>
          </li>
          <li>
            <Link className={active === "gender" ? classes.active : null} to="/genre" onClick={() => handleClick("gender")}>Genres</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;