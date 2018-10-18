import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import mainValidator, {errorCountValidator, errorsToArray, fixTitle} from '../../../misc/formValidations';
import {ADD_MOVIE} from '../../../store/types';
import './AddModal.css';


class AddModal extends Component{

    state = {
        id: '',
        title: '',
        release_year: '',
        runtime: '',
        genre: '',
        director: '',
        errors: {}
    };

    handleChange(e, field) {
        const input = e.target.value;
        this.setState(prevState=>({...prevState,
            [field]: input, errors: {...this.state.errors, ...{[field]: mainValidator([field], input, this.props.movies, true)}}}));
    }

    onSubmit(e){
        e.preventDefault();
        const {title, release_year, runtime, genre, director} = this.state;
        const id = (title.length * release_year.length * genre.length**4 - (this.props.movies.length)**5).toString(); //my weird hashing algorithm, for a unique id
        this.props.addMovie({id: id,
            title: fixTitle(title),
            release_year: release_year,
            runtime: runtime,
            genres: genre,
            poster_path: 'NEW_MOVIE',
            director: director});
        this.props.onClose();
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
                        {"Add a movie to our collection:"}
                    </DialogTitle>

                        <DialogContent>
                            <form id="add-form" autoComplete="off" onSubmit={(e) => this.onSubmit(e)}>
                                <div className='add-dialog-text-fields add-dialog-text-fields'>
                                    <input autoFocus className='form-text-field' id='title'
                                            placeholder='Movie Title'
                                            onChange={(e) => this.handleChange(e, 'title')}/>
                                    <input maxLength="4" className='form-text-field' id='year'
                                            placeholder='Release Year'
                                            onChange={(e) => this.handleChange(e, 'release_year')}/>

                                    <input className='form-text-field' id='runtime'
                                            placeholder='Runtime'
                                            onChange={(e) => this.handleChange(e, 'runtime')}/>
                                    <input className='form-text-field' id='genre'
                                        placeholder='Genre'
                                        onChange={(e) => this.handleChange(e, 'genre')}/>
                                    <input className='form-text-field' id='director'
                                        placeholder='Director'
                                        onChange={(e) => this.handleChange(e, 'director')}/>
                                </div>
                                <div id="dialog-errors">
                                
                                    {errorsToArray(this.state.errors).map((error, index)=><div key={error.length**3+index} className="dialog-err">{error}</div>)}
                                </div>

                                <div className="dialog-actions">
                                    <button disabled={!errorCountValidator(this.state.errors, true)} type="submit" className="dialog-btn">Submit</button>
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
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        addMovie: payload=> dispatch({type: ADD_MOVIE, payload: payload}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);