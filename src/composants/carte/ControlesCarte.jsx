import React from 'react';

const ControlesCarte = () => (
  <g transform="translate(920, 80)">
    <rect x="0" y="0" width="30" height="30" rx="4" fill="white" stroke="#ddd" className="cursor-pointer hover:bg-gray-50" />
    <text x="15" y="20" textAnchor="middle" className="fill-gray-600 font-bold pointer-events-none">+</text>
    <rect x="0" y="32" width="30" height="30" rx="4" fill="white" stroke="#ddd" className="cursor-pointer hover:bg-gray-50" />
    <text x="15" y="52" textAnchor="middle" className="fill-gray-600 font-bold pointer-events-none">-</text>
  </g>
);

export default ControlesCarte;