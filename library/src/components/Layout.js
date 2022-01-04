import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
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