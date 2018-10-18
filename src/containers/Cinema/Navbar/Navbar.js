import React, {Component} from 'react';
import AddModal from '../../Modals/AddModal/AddModal';
import Logo from '../../../images/logo.png';
import './Navbar.css';



class Navbar extends Component{

    state={
        isAddModalOpen: false,
        isTop: true
    }

    handleClick = () =>{
        this.setState({isAddModalOpen: true});
    };

    handleClose = ()=>{
        this.setState({isAddModalOpen: false});
    }

    componentDidMount(){
        document.addEventListener('scroll', () => {
            const isTop = window.scrollY < 10;
            if (isTop !== this.state.isTop) {
                this.setState({ isTop })
            }
          });
    }

    render(){
    return (
        <div className={this.state.isTop?("navbar navbar-top"):("navbar navbar-bottom")}>
            <img alt="Logo" src={Logo}/>
            <div id="add-btn-wrapper"><button onClick={this.handleClick} id="add-btn">+</button></div>
            <AddModal isOpen={this.state.isAddModalOpen} onClose={this.handleClose}/>
        </div>
    )}

}

export default Navbar;