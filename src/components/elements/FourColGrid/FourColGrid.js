import React from 'react';
import './FourColGrid.css';

const FourColGrid = ({children, header, loading}) => {

    const renderElements = () => {
        return children.map((element, i) => {
            return (
                <div key={i} className="rmdb-grid-element">
                    {element}
                </div>
            )
        });
    };

    return (
        <div className="rmdb-grid">
            {header && !loading ? <h1>{header}</h1> : null}
            <div className="rmdb-grid-content">
                {renderElements()}
            </div>
        </div>
    )
};

export default FourColGrid;
