import React from "react";
import './cards.css';
import { useEffect, useState } from "react";
import api from "../../services/api";
import Input from "../Input";
import { Link } from "react-router-dom";

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

function Cards(){
    const [filmes, setFilmes] = useState<Filme[]>([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");

    const changeTitle = (newTitle: string) =>{
        setTitle(newTitle);
    }

    useEffect(()=> {
        async function loadFilmes(){
            const response = await api.get("",{
                params:{
                    s:title,
                }
            })
            if(response.data.Search !== undefined){
                setFilmes(response.data.Search.slice(0,10));
            } else {
                setFilmes([]);
            }
        }
        if(title.length >= 2){
            loadFilmes();
        }
        setLoading(false);
    
    }, [title]);

    const handleImageError = (event: React.FormEvent<HTMLImageElement>) => {
        event.currentTarget.src = 'https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1919.jpg?w=826&t=st=1689530720~exp=1689531320~hmac=1a2cb8dca9e303a75deae345add3c31e0066cd36b78f088d989303abeb6ba24a';
    };


    if(loading){
        return(
            <div>
                <h2>Carregando Filmes</h2>
            </div>
        )
    }


    return(
        <div className="homePrincipal">
            <h1>Welcome ao nosso Movie DBFlix</h1>

            <Input handleSearch={changeTitle}/>

            <div className="small-container-cards">
                {filmes.map((filme)=>{                    
                    return(
                        <div className="row" key={filme.imdbID}>
                            <div className="col-3">
                                <img src={filme.Poster} alt={filme.Title} onError={handleImageError}></img>
                                <strong className="title">{filme.Title}</strong>
                                <p className="dataLancamento">{filme.Year}</p>
                                <Link to={`/card/${filme.imdbID}`}> Detalhes </Link>
                            </div>  
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Cards;