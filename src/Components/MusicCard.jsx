import { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { value, func } = this.props;
    return (
      <div className="player" onChange={ func }>
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
          <label data-testid={ `checkbox-music-${value?.trackId}` }>
            Favorita
            <input type="checkbox" />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  func: PropTypes.func.isRequired,
  value: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
  }).isRequired,
};
