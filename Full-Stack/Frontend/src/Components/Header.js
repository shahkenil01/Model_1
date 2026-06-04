import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => {
  return (
    <nav>
      <ul className="navigation">
        <li>
          <Link to="/Website/index.html">Home</Link>
        </li>

        <li>
          <Link to="/registration">Registration</Link>
        </li>
        <li>
          <Link to="/ProductTable">Product Table</Link>
        </li>
        <li>
          <a href="/Website/AboutUs.html">About Us</a>
        </li>

        <li>
          <a href="/Website/ContactUs.html">Contact Us</a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
