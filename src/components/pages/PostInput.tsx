import React from 'react';
import './PostInput.css';

interface PostInputProps {
  userAvatar: string;
  onPostInputClick: () => void;
}

const PostInput: React.FC<PostInputProps> = ({ userAvatar, onPostInputClick }) => {
    

  const handleTextAreaClick = () => {
    onPostInputClick(); // Call the callback to show the CreatePost component
  };
 
  return (
    <div className="post-input-container">
      <div className="input-show">
        <div className="user-avatar">
          <img src={userAvatar} alt="User Avatar" />
        </div>
        <div className="input-box">
          <textarea
            className="post-textarea"
            placeholder="What's on your mind?"
            onClick={handleTextAreaClick}
          />
          <div className="icon-container">
            <span className="icon video-icon">📹</span>
            <span className="icon image-icon">📷</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
