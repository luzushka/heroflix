import React, {Component} from 'react';
import {connect} from 'react-redux';
import {EDIT_MOVIE} from '../../../store/types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import mainValidator, {errorCountValidator, errorsToArray, fixTitle} from '../../../misc/formValidations';



class EditModal extends Component{

    state = {
        id: '',
        title: '',
        release_year: '',
        runtime: '',
        genres: '',
        poster_path: '',
        director: '',
        errors: {}
    };

    handleChange(e, field) {
        const input = e.target.value;
        this.setState(prevState=>({...prevState,
            [field]: input, errors: {...this.state.errors, ...{[field]: mainValidator([field], input, this.props.movies, false)}}}));
    }

    onSubmit(e){
        e.preventDefault();
        const {id, title, release_year, runtime, genres, director, poster_path} = this.state;
        this.props.editMovie({id: id,
            title: fixTitle(title),
            release_year: release_year,
            runtime: runtime,
            genres: genres,
            poster_path: poster_path,
            director: director});
        this.props.onClose();
    }

    componentWillReceiveProps(nextProps){
        const {id, title, release_year, runtime, genres, director, poster_path} = nextProps.movies
            .find(movie=>movie.id===this.props.movieId); //movie from redux store
        this.setState({id, title, release_year, runtime, genres, director, poster_path});
    }

    render (){
        const {isOpen, onClose} = this.props;

        return (
            <div>
                <Dialog id="add-dialog"
                    open={isOpen}
                    onClose={onClose}
                >
                    <DialogTitle id="dialog-title">
                        {"Edit a movie in our collection:"}
                    </DialogTitle>

                        <DialogContent>
                            <form id="add-form" autoComplete="off" onSubmit={(e) => this.onSubmit(e)}>
                                <div className='add-dialog-text-fields add-dialog-text-fields'>
                                    <input autoFocus className='form-text-field' id='title'
                                            placeholder='Movie Title' value={this.state.title}
                                            onChange={(e) => this.handleChange(e, 'title')}/>
                                    <input maxLength="4" className='form-text-field' id='year'
                                            placeholder='Release Year' value={this.state.release_year}
                                            onChange={(e) => this.handleChange(e, 'release_year')}/>

                                    <input className='form-text-field' id='runtime'
                                            placeholder='Runtime' value={this.state.runtime}
                                            onChange={(e) => this.handleChange(e, 'runtime')}/>
                                    <input className='form-text-field' id='genres'
                                        placeholder='Genre' value={this.state.genres}
                                        onChange={(e) => this.handleChange(e, 'genre')}/>
                                    <input className='form-text-field' id='director'
                                        placeholder='Director' value={this.state.director}
                                        onChange={(e) => this.handleChange(e, 'director')}/>
                                </div>
                                <div id="dialog-errors">
                                
                                    {errorsToArray(this.state.errors).map((error, index)=><div key={error.length**3+index} className="dialog-err">{error}</div>)}
                                </div>

                                <div className="dialog-actions">
                                    <button disabled={!errorCountValidator(this.state.errors, false)} type="submit" className="dialog-btn">Submit</button>
                                    <button type="button" className="dialog-btn dialog-btn-cancel" onClick={onClose}>Cancel</button>
                                </div>
                            </form>
                    </DialogContent>
            
                </Dialog>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        movies: state.movies
    };
}

const mapDispatchToProps = dispatch =>{
    return {
        editMovie: payload=> dispatch({type: EDIT_MOVIE, payload: payload}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);