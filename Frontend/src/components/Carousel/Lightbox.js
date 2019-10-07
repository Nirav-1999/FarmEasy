import React from 'react';
import ImageLightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';

const Lightbox = (props) => {

  const { isOpen, photos, setIsOpen, photoIndex, setIndex } = props;

  if (!isOpen) {
    return null;
  }


  return (
    <ImageLightbox
      mainSrc={photos[photoIndex]}
      nextSrc={photos[(photoIndex + 1) % photos.length]}
      prevSrc={photos[(photoIndex + photos.length - 1) % photos.length]}
      onCloseRequest={() => setIsOpen(false)}
      onMovePrevRequest={() =>
        setIndex((photoIndex + photos.length - 1) % photos.length)
      }
      onMoveNextRequest={() => setIndex((photoIndex + 1) % photos.length)}
      reactModalStyle={{
        overlay: { zIndex: 1200, background: 'rgba(0,0,0,0.2)' }
      }}
    />
  );
};

export default Lightbox;
