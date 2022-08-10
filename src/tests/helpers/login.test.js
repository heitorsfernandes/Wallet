import App from "../../App";
import '@testing-library/jest-dom';
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';

describe("Testes para a página de login", () => {
    test("se renderiza inputs habilitados com email e password válidos e redireciona para '/carteira' ao clicar no buttão de 'Entrar' ", () => {
      const {history} = renderWithRouterAndRedux(<App />);

      const password = screen.getByTestId("password-input");
      const email = screen.getByTestId("email-input");
      const button = screen.getByRole("button");
      expect(password).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();

      userEvent.type(email, "marisa@monte.com");
      userEvent.type(password, "deMaisNinguem");
      expect(button).not.toBeDisabled();
      userEvent.click(button)
      expect(history.location.pathname).toBe('/carteira')
    });
    test("se botão Entrar permanece desabilitado com login e senha inválidos ", () => {
      renderWithRouterAndRedux(<App />);
      const password = screen.getByTestId("password-input");
      const email = screen.getByTestId("email-input");
      const button = screen.getByRole("button");
      userEvent.type(email, "inglaterra");
      userEvent.type(password, "set");
      expect(button).toBeDisabled();
    });
  });