import { Link } from "react-router-dom";
import "../App.css";

const Header = () => {
  return (
    <nav>
      <ul className="navigation">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/registration">Registration</Link>
        </li>
        <li>
          <Link to="/ProductTable">Product Table</Link>
        </li>

      </ul>
    </nav>
  );
}

export default Header;