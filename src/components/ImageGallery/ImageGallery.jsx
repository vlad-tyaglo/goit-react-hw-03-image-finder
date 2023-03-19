import React from "react";
import ImageGalleryItem from "./ImageGalleryItem";
import css from './ImageGallery.module.css';
import PropTypes from "prop-types";

const ImageGallery = ({pictures}) => {

    return (
      <ul className={css.gallery}>
        {pictures.map(picture => (
                <li key={picture.id} className={css.galleryItem}>
                    <ImageGalleryItem picture={picture}/>
                </li>)
        )}
      </ul>)
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    webformatURL: PropTypes.string, 
    largeImageURL: PropTypes.string, 
    tags: PropTypes.string,
  })),
}

export default ImageGallery;