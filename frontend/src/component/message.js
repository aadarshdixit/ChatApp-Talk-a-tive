import React from 'react';

const Message = () => {
  return (
    <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>0 User found</h2>
      <p style={{ color: '#666', fontSize: '16px' }}>No user found with entered name</p>
    </div>
  );
};

export default Message;
