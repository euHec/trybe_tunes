import { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import './Album.css';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    data: {},
    albuns: [],
    favorites: [],
  };

  componentDidMount() {
    this.getMusicAPI();
  }

  componentDidUpdate() {
    this.favoriteSongs();
  }

  favoriteSongs = async () => {
    const favSongs = await getFavoriteSongs();
    // const favSongsId = favSongs.map((id) => id.trackId);
    this.setState({ favorites: favSongs });
  };

  getMusicAPI = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const returned = await getMusics(id);
    this.setState({ albuns: returned, data: returned[0] });
  };

  render() {
    const { albuns, data, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="page-album">
          <div className="data-album">
            <div>
              <img src={ data?.artworkUrl100 } alt={ data?.collectionName } />
            </div>
            <div>
              <span data-testid="artist-name">{data?.artistName}</span>
            </div>
            <div>
              <span data-testid="album-name">{data?.collectionName}</span>
            </div>
          </div>
          <div>
            {albuns.map((album, index) => (index !== 0)
                  && <MusicCard
                    key={ album.trackId }
                    value={ album }
                    favoriteSongs={ favorites }
                    handleChanges={ this.handleChanges }
                  />)}
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
