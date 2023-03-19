import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Album extends Component {
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

Album.propTypes = {
  value: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};
