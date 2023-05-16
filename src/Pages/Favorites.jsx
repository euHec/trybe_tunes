import { Component } from 'react';
import NavBar from '../Components/NavBar';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Headphone2 from '../Imagens/Headphone-pana.svg';
import '../styles/Favorites.css';

export default class Favorites extends Component {
  state = {
    loading: true,
    favorite: [],
  };

  componentDidMount() {
    this.favSongsOnLocalStorage();
  }

  favSongsOnLocalStorage = async () => {
    const favSongs = await getFavoriteSongs();
    this.setState({ loading: false, favorite: favSongs });
  };

  render() {
    const { loading, favorite } = this.state;
    if (loading) { <Loading />; }
    return (
      <div
        className="page-favorites"
        data-testid="page-favorites"
        onChange={ this.favSongsOnLocalStorage }
      >
        <NavBar />
        <div className="content-favorites">
          {
            !favorite.length && (
              <>
                <div className="conteiner-fav-title">
                  <h3>Nenhuma música por aqui, ainda!</h3>
                </div>
                <div className="conteiner-fav-img">
                  <img className="img-fav" src={ Headphone2 } alt="img" />
                </div>
              </>
            )
          }
          {
            favorite.length !== 0 && (
              <div className="favorites">
                { loading
                  ? <Loading />
                  : (
                    favorite.map((fav) => (
                      <MusicCard
                        key={ fav.trackId }
                        value={ fav }
                      />)))}
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
