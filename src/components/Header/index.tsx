//podem ser reutilizados
import React from 'react';
import './header.css';

import { Link } from 'react-router-dom';
function Header(){
    return(
        <header className='header'>
            <Link className='logo'to='/' > Movie DBFlix</Link>

            <div className='menuItems'>
                <Link className='favoritos' to='/favoritos'>Favoritos</Link>
                <Link className='home' to='/'>Home</Link>
            </div>

        </header>
    )
}

export default Header;