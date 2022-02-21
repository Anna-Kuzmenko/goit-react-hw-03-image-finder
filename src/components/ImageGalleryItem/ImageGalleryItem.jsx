import React from 'react';
import PropTypes from 'prop-types';

import './ImageGalleryItem.css';

function ImageGalleryItem({ webformatURL, tags, largeImageURL, onClick }) {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
        onClick={() => onClick({ largeImageURL, tags })}
        // width="200px"
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
