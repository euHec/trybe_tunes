import { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import './Album.css';

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
    const { albuns, data } = this.state;
    console.log(data?.artistName);
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
