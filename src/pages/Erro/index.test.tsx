import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Erro from "../Erro";

describe("Erro", () => {
  test("renders the error page correctly", () => {
    render(
      <Router>
        <Erro />
      </Router>
    );

    const errorMessage = screen.getByText("404");
    const notFoundMessage = screen.getByText("Página não encontrada");
    const linkElement = screen.getByText("Veja todos os filmes!");

    expect(errorMessage).toBeInTheDocument();
    expect(notFoundMessage).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
