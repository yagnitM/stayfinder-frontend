import React from 'react';
import { useEffect } from 'react';

const Messages = () => {
    useEffect(() => {
        document.title = 'Messages • StayFinder';
      }, []);
  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-2xl font-semibold text-gray-700">💬 Messages page is coming soon!</h1>
    </div>
  );
};

export default Messages;