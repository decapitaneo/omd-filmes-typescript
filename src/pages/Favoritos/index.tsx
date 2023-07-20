import React, { useEffect, useState } from "react";
import "./favoritos.css";
import { toast } from "react-toastify";

interface Filme {
    imdbID: string
    Poster: string
    Title: string
}

function Favoritos(){
    const [filmes, setFilmes] = useState<Filme[]>([]);

    useEffect(()=> {
        const minhaLista = localStorage.getItem("@dbflix");
        if (minhaLista) {
            const filmes = JSON.parse(minhaLista)
            setFilmes(filmes)
        } else {
            setFilmes([])
        }
        //setFilmes(JSON.parse(minhaLista || "{}") || []);
    }, []);
    
    const handleImageError = (event: React.FormEvent<HTMLImageElement>) => {
        event.currentTarget.src = 'https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1919.jpg?w=826&t=st=1689530720~exp=1689531320~hmac=1a2cb8dca9e303a75deae345add3c31e0066cd36b78f088d989303abeb6ba24a';
    };

    function excluirFilme(imdb: string){
        let filtroFilmes = filmes.filter((item) => {
            return(item.imdbID !==imdb);
        })
        
        setFilmes(filtroFilmes);
        localStorage.setItem("@dbflix", JSON.stringify(filtroFilmes));
        toast.success("Filme removido com sucesso")
    }


    return(
        <div className="meus-filmes">
            <h2>Bem vindo a página dos seus filmes favoritos!</h2>
            {filmes.length === 0 && <span>Você não possui nenhum filme salvo!</span>}

            <ul>
                {filmes.map((item) =>{
                    return(
                        <li key={item.imdbID}>
                            <img src={item.Poster} onError={handleImageError}></img>
                            <span>{item.Title}</span>
                            <div>
                                <button onClick={() => excluirFilme(item.imdbID)}> Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;