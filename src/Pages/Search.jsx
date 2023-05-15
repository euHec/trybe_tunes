import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import NavBar from '../Components/NavBar';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../Components/AlbumCard';
import '../styles/Search.css';
import Loading from '../Components/Loading';
import SearchMusic from '../Imagens/Playlist-pana.svg';

export default class Search extends Component {
  state = {
    disabled: true,
    itens: [],
    loading: false,
    search: '',
    artist: '',
    validate: false,
  };

  handlechanges = ({ target }) => {
    const MIN_LENGTH = 2;
    const { value } = target;

    if (value.length >= MIN_LENGTH) {
      this.setState({ artist: value, disabled: false, search: value });
    } else {
      this.setState({ artist: value, disabled: true, search: value });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { search } = this.state;
    this.setState({ loading: true });
    const returned = await searchAlbumsAPI(search);
    this.setState({ itens: returned, search: '', loading: false, disabled: true });
    if (returned.length === 0) this.setState({ validate: true });
  };

  render() {
    const { artist, disabled, search, itens, loading, validate } = this.state;
    const validItens = itens.length !== 0;

    if (loading) { <Loading />; }
    return (
      <div className="page-search" data-testid="page-search">
        <header>
          <form onSubmit={ this.handleSubmit }>
            <input
              data-testid="search-artist-input"
              onChange={ this.handlechanges }
              type="text"
              value={ search }
              className="input-search"
              placeholder="Digie um album"
            />
            <button
              type="submit"
              disabled={ disabled }
              data-testid="search-artist-button"
              className="button-search"
            >
              <FaSearch />
            </button>
          </form>
        </header>
        <div className="area-content">
          <NavBar />
          <div className="list-albuns">
            { !validItens && <img src={ SearchMusic } alt="" className="img-search" /> }
            { validItens ? (
              <>
                <div className="title-result">
                  <h5>{`Resultado de álbuns de: ${artist}`}</h5>
                </div>
                <div className="albuns">
                  { itens.map((item) => (
                    <AlbumCard key={ item.collectionId } value={ item } />)) }
                </div>
              </>
            ) : (
              validate && (<span>Nenhum álbum foi encontrado</span>)
            )}
          </div>
        </div>
      </div>
    );
  }
}
