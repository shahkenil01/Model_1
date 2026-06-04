import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => {
  return (
    <nav>
      <ul className="navigation">
        <li>
          <a href="/Website/">Home</a>
        </li>
        <li>
          <Link to="/ProductTable">Product Table</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
