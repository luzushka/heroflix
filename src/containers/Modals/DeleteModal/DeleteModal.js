import React, {Component} from 'react';
import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {DELETE_MOVIE} from '../../../store/types';


class DeleteModal extends Component{

    onClickYes = ()=>{
        const {deleteMovie, onClose} = this.props;
        deleteMovie(this.props.movieId);
        onClose();
    }

    render (){
        const {isOpen, onClose} = this.props;

        return (
            <div>
                <Dialog id="delete-dialog"
                    open={isOpen}
                    onClose={onClose}
                >
                    <DialogTitle id="dialog-title">
                        {"Are you sure you want to delete this movie?"}
                    </DialogTitle>

                        <DialogContent>
                            

                                <div className="dialog-actions">
                                    <button type="button" className="dialog-btn" onClick={this.onClickYes}>Yes</button>
                                    <button type="button" className="dialog-btn dialog-btn-cancel" onClick={onClose}>No</button>
                                </div>
                            
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
        deleteMovie: payload=> dispatch({type: DELETE_MOVIE, id: payload}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);