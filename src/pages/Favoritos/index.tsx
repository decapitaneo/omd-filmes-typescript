import React, { useEffect, useState } from "react";
import "./favoritos.css";

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
        setFilmes(JSON.parse(minhaLista || "{}") || []);
    }, []);

    function excluirFilme(imdb: string){
        let filtroFilmes = filmes.filter((item) => {
            return(item.imdbID !==imdb);
        })
        
        setFilmes(filtroFilmes);
        localStorage.setItem("@dbflix", JSON.stringify(filtroFilmes));
        alert("Filme removido com sucesso")
    }


    return(
        <div className="meus-filmes">
            <h2>Bem vindo a página dos seus filmes favoritos!</h2>
            {filmes.length === 0 && <span>Você não possui nenhum filme salvo!</span>}

            <ul>
                {filmes.map((item) =>{
                    return(
                        <li key={item.imdbID}>
                            <img src={item.Poster}></img>
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