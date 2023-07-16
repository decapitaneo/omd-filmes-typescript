//podem ser reutilizados
import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

function Footer(){
    return(
        <footer className='footer'>
            <Link className='logo' to='/'>Movie DBFlix</Link>
            <Link to="/"><p>&copy; Movie DBFlix 2023</p></Link>
        </footer>
    )
}

export default Footer;