import { Component } from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Album from './Album';

export default class Search extends Component {
  state = {
    disabled: true,
    itens: [],
    loading: true,
    search: '',
  };

  handlechanges = ({ target }) => {
    const MIN_LENGTH = 2;
    const { value } = target;

    if (value.length >= MIN_LENGTH) {
      this.setState({
        search: value,
        disabled: false,
      });
    } else {
      this.setState({
        search: value,
        disabled: true,
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { search } = this.state;
    const returned = await searchAlbumsAPI(search);
    console.log(returned);
    this.setState = ((prev) => ({
      itens: [...prev + returned],
    }));
  };

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <form onSubmit={ this.handleSubmit }>
            <input
              data-testid="search-artist-input"
              onChange={ this.handlechanges }
              type="text"
            />
            <button
              type="submit"
              disabled={ disabled }
              data-testid="search-artist-button"
            >
              Procurar
            </button>
          </form>
        </div>
        {/* <div>
          { loading ? <Loading /> : (
            itens.map((item) = <Album album={ item } />)
          )}
        </div> */}
      </div>
    );
  }
}
