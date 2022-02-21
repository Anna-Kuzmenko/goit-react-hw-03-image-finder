import React from 'react';

import PropTypes from 'prop-types';

import './ImageGallery.css';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ imagesArr, onClick }) {
  return (
    <ul className="ImageGallery ">
      {imagesArr.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onClick={onClick}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  imagesArr: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;

// id
// webformatURL
// largeImageURL
