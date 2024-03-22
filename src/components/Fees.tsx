'use client'
import React from 'react';
import '../components/Fees.css';

function Fees() {
    // Static dummy data based on the image
    const dummyFees = {
        slow: '0.00000028 BTC $0.018136',
        standard: '0.00000033 BTC $0.021374',
        fast: '0.00000038 BTC $0.024613'
    };

    return (
        <div className="fees">
            <label>RECOMMENDED FEES PER BYTE</label>
            <div className="fee-item">
              <span className="fee-label">Slow:</span>
              <span className="fee-text">{dummyFees.slow}</span>
            </div>
            <div className="fee-item">
              <span className="fee-label">Standard:</span>
              <span className="fee-text">{dummyFees.standard}</span>
            </div>
            <div className="fee-item">
              <span className="fee-label">Fast:</span>
              <span className="fee-text">{dummyFees.fast}</span>
            </div>
        </div>
    );
}

export default Fees;
