import { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt, FaSearch, FaRegHeart } from 'react-icons/fa';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './NavBar.css';

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      isName: '',
      loading: true,
    };
    this.getName = this.getName.bind(this);
  }

  async componentDidMount() { await this.getName(); }

  getName = async () => {
    const user = await getUser();
    const { name } = user;
    this.setState({
      loading: false,
      isName: name,
    });
  };

  render() {
    const { loading, isName } = this.state;
    return (
      <div className="nav-bar" data-testid="header-component">
        <div className="nav-bar-section1">
          <div className="links">
            <Link to="/search" data-testid="link-to-search">
              Pesquisa
              <FaSearch />
            </Link>
          </div>
          <div className="links">
            <Link to="/favorites" data-testid="link-to-favorites">
              Favoritos
              <FaRegHeart />
            </Link>
          </div>
          <div className="links">
            <Link to="/profile" data-testid="link-to-profile">
              Perfil
              <FaUserAlt />
            </Link>
          </div>
        </div>
        <div className="nav-bar-section2">
          {
            loading ? <Loading /> : (
              <h5 data-testid="header-user-name">
                { isName }
              </h5>
            )
          }
        </div>
      </div>
    );
  }
}
