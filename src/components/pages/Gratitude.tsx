import React, { useState } from 'react';
import Sidebar from '../pages/Sideba';
import PostInput from './PostInput';
import Feed from './Feed';
import CreatePost from '../posts/CreatePost';
import { useSelector } from 'react-redux';
import { selectFeedData } from '../redux/quiz/quizSlice';

const Gratitude = () => {
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);
  const feedData = useSelector(selectFeedData);
  const ownerInfo = {
    fullName: 'John Doe',
    avatar: 'URL_OF_OWNER_AVATAR',
  };

  const friendsCount = 123;
  const messagesCount = 45;

  const handlePostInputClick = () => {
    setIsCreatePostVisible(true);
  };

  

  return (
    <div>
      <Sidebar ownerInfo={ownerInfo} friendsCount={friendsCount} messagesCount={messagesCount} />

      {/* Always render the PostInput */}
      <PostInput userAvatar="URL_OF_LOGGED_IN_USER_AVATAR" onPostInputClick={handlePostInputClick} />

      {/* Render the CreatePost component if it's visible */}
    <CreatePost  />

      {/* Render the Feed component */}
      <Feed feedData={feedData} />
    </div>
  );
};

export default Gratitude;
