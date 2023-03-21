import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    inputChecked: false,
    loadingMusic: false,
  };

  handleChanges = async ({ target }) => {
    const { checked, name } = target;
    const { value } = this.props;
    this.setState(() => ({ loadingMusic: true, [name]: checked }));
    await addSong(value);
    this.setState({ loadingMusic: false });
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
  value: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
  }).isRequired,
};
