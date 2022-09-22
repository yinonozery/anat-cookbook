import React from 'react';
import logo from '../assets/logo.png';
import NavBar from './NavBar';
import '../css/Header.css';

const Header = () => {
    return (
        <header>
            <a href='/'>
                <img className='logo' src={logo} alt='' />
            </a>
            <h4>ספר המתכונים של ענת</h4>
            <NavBar />
        </header>
    );
};

export default Header;
