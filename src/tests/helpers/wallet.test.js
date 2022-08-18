import '@testing-library/jest-dom';
import React from 'react';
import { renderWithRouterAndRedux } from './renderWith';
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Wallet from "../../pages/Wallet";
import Table from "../../components/Table";
import mockData from "./mockData";


describe('Testes para a página da carteira', () => {
    const allIds = ['value-input', 'description-input',
  'currency-input', 'method-input', 'tag-input'];
    const tableElements = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
    'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    test('se renderiza no header o email, valor total e moeda  ', () => {
      renderWithRouterAndRedux(<Wallet />, {
        initialPath: "/carteira",
        initialState: { user: { email: "heitor_soares96@oi.com" } },
        });
        const email = screen.getByTestId("email-field");
        const totalExpense = screen.getByTestId("total-field");
        const currency = screen.getByTestId("header-currency-field");
        expect(email).toHaveTextContent("heitor_soares96@oi.com");
        expect(totalExpense).toHaveTextContent("0.00");
        expect(currency).toHaveTextContent("BRL");
    });
    test('se renderiza os elementos do formulário', () => {
      renderWithRouterAndRedux(<Wallet />);
      allIds.forEach((element) => expect(screen.getByTestId(element)).toBeDefined());
    });
    test('se esvazia inputs ao Adicionar Despesa', () => {
        renderWithRouterAndRedux(<Wallet />, {
            initialPath: "/carteira",
            initialState: { user: { email: "heitor_soares96@oi.com" } },
        });
        const value = screen.getByTestId('value-input');
        const description = screen.getByTestId('description-input');
        const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });

        userEvent.type(value, '24');
        userEvent.type(description, 'heitor');
        userEvent.click(buttonAdd);

        expect(value).toHaveTextContent('');
        expect(description).toHaveTextContent('');




    });
    test('se renderiza os elementos da tabela', () => {
      renderWithRouterAndRedux(<Table/>)
        tableElements.forEach((element) => expect(screen.getByRole('columnheader', {name: element})).toBeDefined())
    });
    test('', async () => {
      renderWithRouterAndRedux(<Wallet />, {
        initialPath: "/carteira",
        initialState: { user: { email: "heitor_soares96@oi.com" } },
        });
          
          const description = screen.getByTestId('description-input');

          const buttonAddExpense = screen.getByRole('button', { name: /adicionar despesa/i });
          userEvent.click(buttonAddExpense);

          const descriptionTable = await screen.findByTestId('description');
          const tagTBody = await screen.findByTestId('tag');
          const methodTBody = await screen.findByTestId('method');
          const valueTBody = await screen.findByTestId('value');
          const buttonTBody = await screen.findByTestId('delete-btn');

          expect(descriptionTable).toBeVisible();
          expect(valueTBody).toBeVisible();
          expect(methodTBody).toBeVisible();
          expect(tagTBody).toBeVisible();
          expect(buttonTBody).toBeVisible();

          userEvent.click(buttonTBody);

});
});
