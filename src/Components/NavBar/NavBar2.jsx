import { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaSearch, FaRegHeart } from 'react-icons/fa';

export default class NavBar1 extends Component {
  render() {
    return (
      <>
        <div className="links">
          <Link to="/search" data-testid="link-to-search">
            <div>
              Pesquisa
            </div>
            <div>
              <FaSearch />
            </div>
          </Link>
        </div>
        <div className="links">
          <Link to="/favorites" data-testid="link-to-favorites">
            <div>
              Favoritos
            </div>
            <div>
              <FaRegHeart />
            </div>
          </Link>
        </div>
        <div className="links">
          <Link to="/profile" data-testid="link-to-profile">
            <div>
              Perfil
            </div>
            <div>
              <FaUserAlt />
            </div>
          </Link>
        </div>
      </>
    );
  }
}
