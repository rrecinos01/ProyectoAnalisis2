// components/Card.js
import React from 'react';

const Card = ({ iconClass, bgColor, title, value }) => {
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className={`card-widget h-100 ${bgColor}`}>
        <div className="card-widget-body">
          <div className="dot me-3 bg-indigo"></div>
          <div className="text">
            <h6 className="mb-0">{title}</h6><span className="text-gray-500">{value}</span>
          </div>
        </div>
        <div className={`icon text-white ${bgColor}`}><i className={iconClass}></i></div>
      </div>
    </div>
  );
};

export default Card;
