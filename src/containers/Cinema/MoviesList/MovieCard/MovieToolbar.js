import React, {Component} from 'react';
import EditModal from '../../../Modals/EditModal/EditModal';
import DeleteModal from '../../../Modals/DeleteModal/DeleteModal';


export default class MovieToolbar extends Component{
    
    state={
        isDeleteModalOpen: false,
        isEditModalOpen: false
    }

    handleClick = buttonString=>{
        this.setState({[buttonString]: true});
    };

    /**A close handler for all modal types */
    handleClose = buttonString=>{
        this.setState({[buttonString]: false});
    }



    render(){
        const {isDeleteModalOpen, isEditModalOpen} = this.state;
        return(
        <div className="movie-toolbar">

            <div className="edit-btn" onClick={this.handleClick.bind(this, 'isEditModalOpen')}>
                <img alt="Edit button" src='https://image.flaticon.com/icons/svg/148/148926.svg' height="18px" width="18px"/>
            </div>

            <div className="delete-btn" onClick={this.handleClick.bind(this, 'isDeleteModalOpen')}>
                <img alt="Delete button" src='https://image.flaticon.com/icons/svg/834/834356.svg' height="18px" width="18px"/>
            </div>
            <DeleteModal isOpen={isDeleteModalOpen} movieId={this.props.movieId} onClose={this.handleClose.bind(this, 'isDeleteModalOpen')}/>
            <EditModal isOpen={isEditModalOpen} movieId={this.props.movieId} onClose={this.handleClose.bind(this, 'isEditModalOpen')}/>

    </div>
        );
    }
}