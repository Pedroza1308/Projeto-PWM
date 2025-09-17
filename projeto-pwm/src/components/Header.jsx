"use client";

import React, { useState } from 'react';
import Menu from './Menu'
import './Header.css'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const abreMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return(
        <header className="header">
            <button className="menu-button" onClick={abreMenu}>
                ☰
            </button>
            <h1>Nosso projeto react</h1>
            <Menu isOpen={isMenuOpen}></Menu>
        </header>
    )
}

export default Header;