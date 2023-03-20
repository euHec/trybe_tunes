import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class AlbumCard extends Component {
  render() {
    const { value } = this.props;
    const {
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
    } = value;
    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <div>
          <div><img src={ artworkUrl100 } alt="" /></div>
          <div><span>{artistName}</span></div>
          <div><span>{collectionName}</span></div>
          <div><span>{collectionPrice}</span></div>
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
