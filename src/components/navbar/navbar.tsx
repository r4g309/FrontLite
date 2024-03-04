import { Link } from "react-router-dom";
import { getToken, removeToken } from "../../utils/token";
import "./navbar.css";

export const NavBar = () => {
  const token = getToken();

  return (
    <>
      <nav>
        <ul>
          {token === null && (
            <li>
              <Link to="/">Home</Link>
            </li>
          )}
          {token !== null && (
            <>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/company">Company</Link>
              </li>

              <li>
                <Link to="/inventory">Inventory</Link>
              </li>
              <li>
                <Link to="/registerCompany">Register Company</Link>
              </li>
            </>
          )}
          {token !== null && (
            <li>
              <button className="logout-btn" onClick={removeToken}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};
