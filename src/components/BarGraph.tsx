// BarGraph.js

'use client'
import React from 'react';
import '../components/BarGraph.css';

function BarGraph() {
  // Replace this with your actual data
  const barHeights = [70, 50, 80, 60, 75, 85, 60, 80, 55, 65,85, 60, 80, 55, 65, 85, 60, 80, 55, 65 ];

  return (
    <div className="bar-graph">
      {barHeights.map((height, index) => (
        <div key={index} className="bar-holder" style={{ height: '100%' }}> {/* Full height */}
          <div
            className="bar"
            style={{ height: `${height}%`, backgroundColor: index % 2 === 0 ? '#FFA500' : '#D3D3D3' }}
          />
        </div>
      ))}
    </div>
  );
}

export default BarGraph;
