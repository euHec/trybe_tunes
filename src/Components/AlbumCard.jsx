import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/AlbumCard.css';

export default class AlbumCard extends Component {
  render() {
    const { value } = this.props;
    const {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } = value;
    return (
      <Link
        to={ `/trybe_tunes/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <div className="album">
          <div className="album-img">
            <img src={ artworkUrl100 } alt="" />
          </div>
          <div className="album-infos">
            <p>{artistName}</p>
            <p>{collectionName}</p>
          </div>
        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  value: PropTypes.shape({
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};
