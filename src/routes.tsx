import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Card from './pages/Detalhe';
import Home from './pages/Home';
import Header from './components/Header';
import Favoritos from './pages/Favoritos';
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
    </BrowserRouter>
    )
    
}

export default RoutesApp;