import React, { useState } from 'react';
import { ApiResponse } from '../utils/Types';
import './Feed.css';

interface FeedProps {
  feedData: ApiResponse;
}

const Feed: React.FC<FeedProps> = ({ feedData }) => {
  console.log(feedData);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!feedData || !feedData.data || !feedData.data) {
    return <div>No data to display</div>;
  }

  const data = feedData.data;

  const handleReadMore = (id: number) => {
    setExpandedIds((prevIds) => [...prevIds, id]);
  };

  function extractPlainTextFromHTML(htmlString) {
    const temporaryElement = document.createElement('div');
    temporaryElement.innerHTML = htmlString;
    return temporaryElement.innerText;
  }

  return (
    <div className="feed-container">
      {data.map((item: any) => (
        <div className="feed-item" key={item.id}>
          <div className="user-details">
            {item.status && (
              <div className="biography">Full Name: {extractPlainTextFromHTML(item.status)}</div>
            )}
            {item.category && <div className="category">Category: {item.category}</div>}
            {item.impact && <div className="impact">Impact: {item.impact}</div>}
            {item.project && <div className="project">Project: {item.project}</div>}

          </div>
          <div className="image-container">
            {item.embed_object &&
              item.embed_object.photos &&
              item.embed_object.photos.length > 0 && (
                <img
                  className="post-image"
                  src={item.embed_object.photos[0].image.origin}
                  alt="Post"
                />
              )}
          </div>
          <div className="interactions">
            <div className="comments">
              <span className="comments-icon">💬</span>
              <span className="comments-count">{item.comments_count || 0}</span>
            </div>
            <div className="likes">
              <span className="likes-icon">👍</span>
              <span className="likes-count">{item.likes_count || 0}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
