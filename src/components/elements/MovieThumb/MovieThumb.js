import React from 'react';
import './MovieThumb.css';
import {Link} from "react-router-dom";

const MovieThumb = ({movieId, image}) => {

    return (
        <Link style={(window.location.pathname.length > 1) ? {pointerEvents: 'none'} : null}
              to={{pathname: `/${movieId}`}}>
            <div className="rmdb-moviethumb">
                <img src={image} alt="movieThumb"/>
            </div>
        </Link>
    )
};

export default MovieThumb;
