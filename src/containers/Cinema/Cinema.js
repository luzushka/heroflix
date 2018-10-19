import React from 'react';
import Footer from './Footer/Footer';
import MoviesBox from './MoviesBox/MoviesBox';
import Navbar from './Navbar/Navbar';

const cinema = props =>{

        return (
            <div id="cinema">
                <Navbar/>
                    <MoviesBox/>
                <Footer/>
            </div>
        );
}


export default cinema;