import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        </div>
        <div>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        </div>
        <div>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </div>
      </div>
    );
  }
}
