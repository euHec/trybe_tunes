import { Component } from 'react';
import Header from '../Components/Header';
// import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../Components/AlbumCard';

export default class Search extends Component {
  state = {
    disabled: true,
    itens: [],
    // loading: false,
    search: '',
    artist: '',
    // validate: false,
  };

  handlechanges = ({ target }) => {
    const MIN_LENGTH = 2;
    const { value } = target;

    if (value.length >= MIN_LENGTH) {
      this.setState({
        artist: value,
        disabled: false,
        search: value,
      });
    } else {
      this.setState({
        artist: value,
        disabled: true,
        search: value,
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { search } = this.state;
    // this.setState({ loading: true });
    const returned = await searchAlbumsAPI(search);
    this.setState({ itens: returned, search: '' });
  };

  render() {
    const { artist, disabled, search, itens } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <form onSubmit={ this.handleSubmit }>
            <input
              data-testid="search-artist-input"
              onChange={ this.handlechanges }
              type="text"
              value={ search }
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
        <div>
          { itens.length !== 0 ? (
            <div>
              <span>
                {`Resultado de álbuns de: ${artist}`}
              </span>

              { itens.map((item) => (
                <AlbumCard key={ item.collectionId } value={ item } />)) }
            </div>
          ) : (
            <div>
              <span>Nenhum álbum foi encontrado</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}
