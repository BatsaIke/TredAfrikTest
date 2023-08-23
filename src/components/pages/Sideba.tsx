// Sidebar.tsx
import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  ownerInfo: {
    fullName: string;
    avatar: string;
  };
  friendsCount: number;
  messagesCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ ownerInfo, friendsCount, messagesCount }) => {
  return (
    <div className="sidebar">
      <div className="owner-info">
        <img className="avatar" src={ownerInfo.avatar} alt="Owner Avatar" />
        <span className="full-name">{ownerInfo.fullName}</span>
      </div>
      <div className="sidebar-item">
        <span className="icon">👥</span>
        <span className="text">Friends: {friendsCount}</span>
      </div>
      <div className="sidebar-item">
        <span className="icon">💬</span>
        <span className="text">Messages: {messagesCount}</span>
      </div>
      {/* Add more sidebar items as needed */}
    </div>
  );
};

export default Sidebar;
