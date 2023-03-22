import { Component } from 'react';
import PropTypes from 'prop-types';
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
    // this.haveChecked();
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
    if (loadingMusic) { return (<Loading />); }
    return (
      <div className="player">
        <div>
          <span>{ value?.trackName }</span>
        </div>
        <div>
          <audio data-testid="audio-component" src={ value?.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </div>
        <div>
          <label
            htmlFor={ value?.trackId }
            data-testid={ `checkbox-music-${value?.trackId}` }
          >
            Favorita
            <input
              type="checkbox"
              name="inputChecked"
              id={ value?.trackId }
              checked={ inputChecked }
              onChange={ this.handleChanges }
            />
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
