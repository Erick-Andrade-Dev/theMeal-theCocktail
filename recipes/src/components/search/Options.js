import React, { useContext } from 'react';
import ReceitasContext from '../../context/ReceitasContext';

export default function Options() {
  const { setOptionsValue } = useContext(ReceitasContext);

  return (
    <div>
      <div style={{marginBottom: '5px'}}>
        <input
          id="ingrediente"
          key="ingrediente"          
          type="radio"
          value="ingrediente"
          name="options"
          onChange={() => setOptionsValue('ingrediente')}
        />        
        <label htmlFor="ingrediente">Ingrediente</label> 
      </div>     
      <div style={{marginBottom: '5px'}}>
        <input
          id="nome"
          key="nome"          
          type="radio"
          value="nome"
          name="options"
          onChange={() => setOptionsValue('nome')}
        />
        <label htmlFor="nome">Nome</label>
      </div>
      <div style={{marginBottom: '5px'}}>
        <input
          id="primeiraLetra"
          key="primeiraLetra"         
          type="radio"
          value="primeiraLetra"
          name="options"
          onChange={() => setOptionsValue('primeiraLetra')}
        />
        <label htmlFor="primeiraLetra">Primeira letra</label>
      </div>
    </div>
  );
}