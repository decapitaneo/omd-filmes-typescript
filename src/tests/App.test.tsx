import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

test("renders ToastContainer", async () => {
  render(<App />);

  await waitFor(() => {
    const toastContainerElement = screen.getByText("Movie DBFlix");
    expect(toastContainerElement).toBeInTheDocument();
  });
});

test("renders RoutesApp", () => {
    render(<App />);  
});
