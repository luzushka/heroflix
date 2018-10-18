import React, {Component} from 'react';
import {connect} from 'react-redux';
import MovieCard from './MovieCard/MovieCard';
import MovieGenres from './MovieGenres';
import { BeatLoader } from 'react-spinners';
import {APIKey, popularMovies, infoAboutAMovie} from '../../../misc/API';
import { ADD_MOVIE } from '../../../store/types';
import format from 'string-format';
import './MoviesList.css';

class MoviesBox extends Component{
    
    state = {
        error:'',
        isLoaded: false,
        displayed: ''
    }

    /**Gets the director(s) out of the response data */
    extractDirectors = crewArray =>{
        let directorsArray = [];

        crewArray.forEach(member=>{
            if (member.job === "Director"){
                directorsArray.push(member.name)
            }
        })

        return directorsArray;
    }

    componentWillMount(){
        this.setDisplayed(this.props.movies);
    }

    componentWillReceiveProps(nextProps){
        this.setDisplayed(nextProps.movies);
    }

    /**A couple of conditions that determine what is displayed in this component  */
    setDisplayed(movies){

        const moviesArr = movies.map(movie=>( 
            <MovieCard key={movie.id} movie={movie}/>
        ));

        if (this.state.error.length>0){
            
            

        }
        else if ((movies.length>15) && (!this.state.isLoaded)){ //more than 15 movies for prettier loading
            this.setState({isLoaded: true},
                ()=>(this.setState({displayed:moviesArr})));
        }

        else if ((movies.length>0) && (this.state.isLoaded)){
            this.setState({displayed: moviesArr});
        }

        else if ((movies.length===0) && (this.state.isLoaded)){
            this.setState({displayed: (
                <div style={{color:"seagreen", fontSize:"60px"}}> There are no movies. Wanna add some? </div>
            )});
        }

        else {
            this.setState({displayed: (<div id="loader"><BeatLoader color={"#05c46b"} loading={true}/></div>)});
        }


    }

    getMovies(){
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        fetch(format(popularMovies, APIKey),{headers: headers})
        .then(response=>response.json())
            .then(data=>{
                data.results.forEach(result=>{
                        //
                    fetch(format(infoAboutAMovie, result.id, APIKey), {headers: headers})
                    .then(newDataResponse=> {
                        if (newDataResponse.ok){
                            return newDataResponse.json()
                        }

                        else{ //fetch doesn't reject on error statuses so I rejected myself
                            let {status, statusText} = newDataResponse;
                            this.setState({error:{
                                status: status,
                                msg: statusText}})
                            
                            
                            return Promise.reject(`${status}: ${statusText}`);
                        }
                    
                    })
                    .then(newDataBody=>{
                        this.props.addMovie({
                            id: result.id,
                            title: result.title,
                            release_year: result.release_date.match(/\d{4,4}/g)[0],
                            runtime: newDataBody.runtime,
                            genres: result.genre_ids.map(id=>MovieGenres[id]).join(', '),
                            poster_path: result.poster_path,
                            director: this.extractDirectors(newDataBody.credits.crew).join(', ')
            
                        })
                    })
                    .catch(err=>{
                        this.setState({error: {status: err, msg:err}}, ()=>{
                            const displayed = (
                                <div id="load-error-div">
                                    Oops! An error occured.
                                    The page will refresh.
                                </div>);
                            this.setState({displayed:displayed},
                                ()=>setTimeout(()=>{window.location.href="/heroflix"}, 4000));
                    })  
                })
               
            })
        })
            .catch(err=>{
                console.log("[Error]",err);
                setTimeout(()=>{window.location.href="/heroflix"}, 4000) //especially for 429 status codes.
                                                                        //tMDB's limit is 40 requests per 10 sec.
                                                                        
            })
        }
        

    componentDidMount()
    {
        this.getMovies();
    }


    render()
    {
        return (
            <div className="movies-list">
                {this.state.displayed}
            </div>);
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        addMovie: payload=> dispatch({type: ADD_MOVIE, payload: payload}),
    };
}

const mapStateToProps = state => {
    return {
        movies: state.movies
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesBox);

    