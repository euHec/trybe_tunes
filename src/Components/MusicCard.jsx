import { Component } from 'react';
import PropTypes from 'prop-types';
import { FaRegHeart } from 'react-icons/fa';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    inputChecked: false,
    loadingMusic: false,
  };

  componentDidMount() {
    this.haveChecked();
  }

  handleChanges = async ({ target }) => {
    const { checked } = target;
    const { value } = this.props;
    if (checked === true) {
      this.setState(() => ({ inputChecked: checked, loadingMusic: true }));
      await addSong(value);
      this.setState({ loadingMusic: false });
    } else {
      this.setState(() => ({ inputChecked: checked, loadingMusic: true }));
      await removeSong(value);
      this.setState({ loadingMusic: false });
    }
  };

  haveChecked = async () => {
    const { value } = this.props;
    const favSongs = await getFavoriteSongs() || [];
    const isFavorite = favSongs
      .some((song) => song.trackId === value.trackId);
    this.setState({ inputChecked: isFavorite });
  };

  render() {
    const { value } = this.props;
    const { inputChecked, loadingMusic } = this.state;
    // if (loadingMusic) { return (<Loading />); }
    return (
      <div className="player">
        <div className="player-name">
          <h3>{ value?.trackName }</h3>
        </div>
        <div className="player-audio">
          <audio data-testid="audio-component" src={ value?.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </div>
        <div className="player-favorite">
          <input
            type="checkbox"
            name="inputChecked"
            id={ value?.trackId }
            checked={ inputChecked }
            onChange={ this.handleChanges }
          />
          <label
            className="icon"
            htmlFor={ value?.trackId }
            data-testid={ `checkbox-music-${value?.trackId}` }
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935
                0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1
                3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>

          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  // favSongs: PropTypes.func.isRequired,
  // inputChecked: PropTypes.bool.isRequired,
  // favoriteSongs: PropTypes.shape(
  //   PropTypes,
  // ).isRequired,
  value: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
  }).isRequired,
};
