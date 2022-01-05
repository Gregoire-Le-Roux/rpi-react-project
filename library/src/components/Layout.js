import { Outlet, Link } from "react-router-dom";
import classes from './Layout.module.css';

const Layout = () => {
  return (
    <>
      <nav className={classes.navbar}>
        <ul>
          <li>
            <Link to="/">Livres</Link>
          </li>
          <li>
            <Link to="/auteur">Auteurs</Link>
          </li>
          <li>
            <Link to="/genre">Genres</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;