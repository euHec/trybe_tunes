import { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaSearch, FaRegHeart } from 'react-icons/fa';

export default class NavBar1 extends Component {
  render() {
    return (
      <div className="hide-nav">
        <div className="links">
          <Link to="/search" data-testid="link-to-search">
            <FaSearch />
          </Link>
        </div>
        <div className="links">
          <Link to="/favorites" data-testid="link-to-favorites">
            <FaRegHeart />
          </Link>
        </div>
        <div className="links">
          <Link to="/profile" data-testid="link-to-profile">
            <FaUserAlt />
          </Link>
        </div>
      </div>
    );
  }
}
