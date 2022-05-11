import React, { FC, useState } from 'react';

interface ModalProps {
  src: string;
  onClose: () => void;
  imageTitle: string;
}

const Modal: FC<ModalProps> = ({ src, onClose, imageTitle }) => {
  const [imageLoading, setImageLoading] = useState(true);

  return(
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        {imageLoading && <div className="loading-wrapper"><div className="loading"></div></div>}
        <img src={src} alt="" onLoad={() => setImageLoading(false)} className={imageLoading ? 'is-hidden' : ''} />
        {!imageLoading && <p className="title">{imageTitle}</p>}
      </div>
      <button className="modal-close is-large" onClick={onClose}></button>
    </div>
  );
}

export default Modal;