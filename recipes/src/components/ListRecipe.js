import React, { useContext, useEffect, useState } from 'react';
import ReceitasContext from '../context/ReceitasContext';
import Recipes from './Recipe'

export default function ListRecipe() {
  const { receitas } = useContext(ReceitasContext)
  const [newRecipe, setNewRecipe] = useState([])

  useEffect(() => {
    return (
      receitas === null || receitas === undefined ? null : setNewRecipe(receitas)
    )
  }, [receitas])
  if (receitas === undefined || receitas === null || typeof receitas !== 'object') {
    return <h1>Loading...</h1>;
  }
  if (newRecipe === undefined || newRecipe === null || typeof newRecipe !== 'object') {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container-foods-drinks">
      {
        !newRecipe
          ? null 
          :newRecipe
            .filter((_item, index) => index < 12)
            .map((item, index) => (
              <Recipes 
                key={ index }
                receita = { item }
                index = { index }
              />
            ))
      }
    </div>
  );
}