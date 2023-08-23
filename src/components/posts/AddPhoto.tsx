import React, { useState } from 'react';

interface PhotoPreviewerProps {
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const PhotoPreviewer = ({ setSelectedFile }: PhotoPreviewerProps) => {
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const handleRemovePhoto = () => {
    setPreviewFile(null);
    setSelectedFile(null);
  };


  return (
    <div className="photo-previewer my-4">
      {previewFile ? (
        <div className="position-relative">
          <img
            src={previewFile}
            alt="Preview"
            className="preview-image img-fluid rounded"
            style={{ width: '100px', height: '100px' }} // Adjust the width and height here
          />
          <button
            onClick={handleRemovePhoto}
            className="btn btn-light btn-remove-photo position-absolute top-0 start-100 translate-middle border border-light rounded-circle"
            title="Remove photo"
          >
            &times;
          </button>
        </div>
      ) : (
        <div className="text-center">
          <label htmlFor="fileInput" className="btn btn-light btn-add-photo" title="Click to select a photo">
            Add Photo
          </label>
          <input
            id="fileInput"
            type="file"
            accept=".jpg, .jpeg, .png"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (file && file.type.startsWith('image/')) {
                setSelectedFile(file);
                const reader = new FileReader();
                reader.onload = () => {
                  setPreviewFile(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoPreviewer;
