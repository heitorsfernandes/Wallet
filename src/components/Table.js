import React, { Component } from 'react';

export default class Table extends Component {
  render() {
    const headerList = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    return (
      <table>
        <thead>
          <tr>
            {headerList.map((item, index) => <th key={ index }>{item}</th>)}
          </tr>
        </thead>
      </table>
    );
  }
}
