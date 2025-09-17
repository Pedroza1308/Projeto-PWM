import React from 'react';
import './Menu.css';

const Menu = ({ isOpen }) => {
    return (
        <nav className={`menu ${isOpen ? "open" : ""}`}>
            <ul>
                <li><a href='#home'>Inicio</a></li>
                <li><a href='#conteudo'>conteudo</a></li>
                <li><a href='#mais conteudo'>mais conteudo</a></li>
                <li><a href='#fim'>final</a></li>
            </ul>
        </nav>
    );
};

export default Menu;