import { Component } from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
    return (
      <div data-testid="page-favorites" onChange={ this.favSongsOnLocalStorage }>
        <Header />
        { loading
          ? <Loading /> : (
            favorite.map((fav) => <MusicCard key={ fav.trackId } value={ fav } />))}
      </div>
    );
  }
}
