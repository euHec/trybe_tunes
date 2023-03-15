import { Component } from 'react';
import Header from '../Components/Header';

export default class Search extends Component {
  state = {
    disabled: true,
  };

  handlechanges = ({ target }) => {
    const MIN_LENGTH = 2;
    const { value } = target;

    if (value.length >= MIN_LENGTH) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <input
            data-testid="search-artist-input"
            onChange={ this.handlechanges }
            type="text"
          />
          <button
            disabled={ disabled }
            data-testid="search-artist-button"
          >
            Procurar
          </button>
        </form>
      </div>
    );
  }
}
