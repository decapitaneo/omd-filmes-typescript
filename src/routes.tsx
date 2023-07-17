import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
//import Filme from './components/Filme';
import Card from './pages/Detalhe';
import Home from './pages/Home';
import Header from './components/Header';
import Favoritos from './pages/Favoritos';
import Footer from './components/Footer';
import Erro from './pages/Erro';

function RoutesApp(){
    return(
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={ <Home/>}/>
            <Route path="/card/:id" element={ <Card/> } />
            <Route path="/favoritos" element={ <Favoritos/>}/>


            <Route path="*" element={ <Erro/>} />
            
        </Routes>
        <Footer/>
    </BrowserRouter>
    )
    
}

export default RoutesApp;