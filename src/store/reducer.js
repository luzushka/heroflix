import {ADD_MOVIE, EDIT_MOVIE, DELETE_MOVIE} from './types';

const initialState = {
    movies:[]
}

const reducer = (state=initialState, action) =>{
    switch (action.type){
        case ADD_MOVIE:
            return {
                ...state,
                movies: [...state.movies, action.payload]
            }
        case DELETE_MOVIE:
            return {
                ...state,
                movies: [...state.movies].filter(result=>result.id!==action.id)
            }
        

        case EDIT_MOVIE:
            const indexOfMovie = state.movies.findIndex(movie=>movie.id===action.payload.id);
            let moviesCopy = [...state.movies];
            moviesCopy[indexOfMovie] = action.payload;


            return {
                ...state,
                movies: moviesCopy
            }

        default:
            return state;
        
    }
};

export default reducer;