import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const Gallery = ({ images, userUpload = false }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const allImages = [...images, ...uploadedImages];

  const handleImageClick = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImages(prev => [
        ...prev,
        {
          id: Date.now(),
          url: reader.result,
          caption: 'Your uploaded photo',
          userUploaded: true
        }
      ]);
      setSelectedFile(null);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h2>Photo Gallery</h2>
        {userUpload && (
          <div className="upload-section">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
            <button 
              onClick={handleUpload}
              disabled={!selectedFile}
            >
              Upload Photo
            </button>
          </div>
        )}
      </div>

      <div className="gallery-grid">
        {allImages.map((image, index) => (
          <div 
            key={image.id} 
            className="gallery-item"
            onClick={() => handleImageClick(index)}
          >
            <img 
              src={image.url} 
              alt={image.caption || 'Travel photo'} 
              className={image.userUploaded ? 'user-uploaded' : ''}
            />
            {image.caption && <div className="image-caption">{image.caption}</div>}
          </div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={allImages[photoIndex].url}
          nextSrc={allImages[(photoIndex + 1) % allImages.length].url}
          prevSrc={allImages[(photoIndex + allImages.length - 1) % allImages.length].url}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + allImages.length - 1) % allImages.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % allImages.length)
          }
          imageCaption={allImages[photoIndex].caption}
        />
      )}
    </div>
  );
};

export default Gallery;