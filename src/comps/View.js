import React from 'react';

const View = ({children}) => {
  return <div className="py-2 mb-20 mt-20 h-full bg-primary w-10/12 mx-auto">
      {children}
      </div>;
};

export default View;
