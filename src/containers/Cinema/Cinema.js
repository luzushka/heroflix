import React, {Component} from 'react';
import Footer from './Footer/Footer';
import MoviesList from './MoviesList/MoviesList';
import Navbar from './Navbar/Navbar';

class Cinema extends Component{

    render(){
        return (
            <div id="cinema">
                <Navbar/>
                    <MoviesList/>
                <Footer/>
            </div>
        );
    }
}

export default Cinema;