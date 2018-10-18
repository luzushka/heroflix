import React from 'react';
import styled from 'styled-components';
import CardContent from '@material-ui/core/CardContent';
import MovieToolbar from './MovieToolbar';
import {posterURLPrefix} from '../../../../misc/API';
import './MovieCard.css';

/**Shorten strings if they exceed the specified length and add "..." after it */
const shortenStrings = (stringToShorten, maxLength) =>{
    return (
        stringToShorten.length>maxLength?
        stringToShorten.slice(0,maxLength)+"..."
        :stringToShorten
    );
}

/**Returns a card image url based on whether the  */
const decideCardImgURL = poster_path =>{
    return (poster_path === "NEW_MOVIE")?'newcardpop.png':posterURLPrefix+poster_path;   
}

/**I chose a styled component because of the dynamic URL */
const MovieCardBackground = styled.div`
    height:100%;
    background-image: url(${props=>decideCardImgURL(props.posterPath)});
    /* background-size: auto; */
`

const movieCard = props =>{
    return (
        <div className="movie-card">
           <MovieCardBackground posterPath={props.movie.poster_path}>
            <div className="movie-card-info-wrapper">
                    <div className="movie-card-info">
                        <CardContent >
                            <MovieToolbar movieId={props.movie.id}/>
                            <br/>
                            <div className="movie-header">
                                <h4 className="movie-title">{shortenStrings(props.movie.title, 30)}</h4>
                                <h5 className="movie-year"> {`(${props.movie.release_year})`}</h5>
                            </div>
                            <h6>{props.movie.runtime+" Min."}</h6>
                            <h6>{props.movie.genres}</h6>
                            <h6>{"Directed by "+props.movie.director}</h6>
                            
                        </CardContent>
                    </div>
                </div>
            </MovieCardBackground> 
            
        </div>);
}

export default movieCard;