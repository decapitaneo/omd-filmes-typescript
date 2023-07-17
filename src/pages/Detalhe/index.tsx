import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import "./detalhe.css";
import {toast} from "react-toastify"

interface Filme {
    imdbID: string
    Poster: string
    Title: string
    Genre: string
    Year: number
    imdbRating: number
    Actors: string
    Plot: string
}

function Card(){
        const params = useParams();
        const imdb = params.id;
        const navigate = useNavigate();
        const [filme, setFilme] = useState<Filme>({
            imdbID:"",
            Poster: "",
            Title: "",
            Genre:"",
            Year: new Date().getFullYear(),
            imdbRating: 0,
            Actors: "",
            Plot: ""
        });
        const [loading, setLoading] = useState(true);

        useEffect(() =>{
            async function loadFilme(){
                await api.get('', {
                    params:{
                        i:imdb
                    }
            
                })
                .then((response) => {
                    console.log(response.data)
                    setFilme(response.data); 
                    setLoading(false);
                })
                .catch(() => {
                    console.log("filme não encontrado");
                    navigate("/", {replace:true});
                    return;
                })
            }
            loadFilme();
            return() => {
                console.log("componente desmontado")
            }
        }, [navigate, imdb]);
    

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@dbflix");
        let filmesSalvos = []
        if (minhaLista) filmesSalvos = JSON.parse(minhaLista);

        const hasFilmes = filmesSalvos.some((f: Filme) => f.imdbID === filme.imdbID);
        
        if(hasFilmes){
            alert("Esse filme já está na sua lista!");
            return;
        }
    

        filmesSalvos.push(filme);
        localStorage.setItem("@dbflix", JSON.stringify(filmesSalvos));
        alert("Filme salvo com sucesso");
    };

    const handleImageError = (event: React.FormEvent<HTMLImageElement>) => {
        event.currentTarget.src = 'https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1919.jpg?w=826&t=st=1689530720~exp=1689531320~hmac=1a2cb8dca9e303a75deae345add3c31e0066cd36b78f088d989303abeb6ba24a';
    };


    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="container">
            <h1>  Movie DBFlix apresenta: </h1> 
            <div className="small-container-card">   
                    <div className="small-container-card-poster">
                        <img src={filme.Poster} alt={filme.Title} onError={handleImageError}></img>
                    </div>  
                <div className="small-container-card-info">
                    <h2>{filme.Title}</h2> 
                    <div className="caracteristicas">
                        <p><span>Gênero:</span> {filme.Genre}</p>
                        <p className="dataLancamento"><span>Ano de lançamento:</span> {filme.Year}</p>
                        <p className="evaluation"><span>Avalição:</span> {filme.imdbRating}</p>
                        <p><span>Atores:</span>  {filme.Actors}</p>
                        <p><span>Sinopse:</span> {filme.Plot}</p>
                    </div>  
                        <button onClick={salvarFilme}>Favoritar</button>
                    </div>    
            </div>
        </div>
    )    
}

export default Card;