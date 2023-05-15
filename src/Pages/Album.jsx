import { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import NavBar from '../Components/NavBar';
import MusicCard from '../Components/MusicCard';
import './Album.css';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    data: {},
    albuns: [],
  };

  componentDidMount() {
    this.getMusicAPI();
  }

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
      <>
        <NavBar />
        <div className="page-album" data-testid="page-album">
          <div className="data-album">
            <div className="card-album">
              <img src={ data?.artworkUrl100 } alt={ data?.collectionName } />
              <span data-testid="artist-name">{data?.artistName}</span>
              <span data-testid="album-name">{data?.collectionName}</span>
            </div>
          </div>
          <div className="list-player">
            <div className="players">
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
      </>
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
