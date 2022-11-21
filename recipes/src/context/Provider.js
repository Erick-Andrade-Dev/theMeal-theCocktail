import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ReceitasContext from './ReceitasContext'
import {
  searchCockTailByName,
  searchCockTailByLetter,
  searchCockTailByIngredient,
} from '../services/drinksApi'
import {
  ApiSearchMealByName,
  ApiSearchByFirstLetter,
  ApiSearchByMainIngredient,
} from '../services/foodApi'

function noElements(arr) {
  if(!arr) {
    window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return null;
  }
  return arr.length === 0 
    ? window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
    : null;
}

export function filterFoods(title, optionsValue, searchValue, setReceitas, setIsFetching) {
  if(optionsValue === 'primeiraLetra') {
    if(searchValue.length !== 1) {
      window.alert('Sua busca deve conter somente 1 (um) caracter');
      return null;
    }
    ApiSearchByFirstLetter(searchValue)
      .then((listFood) => {
        setReceitas(listFood);
        noElements(listFood);
      })
      .then(() => {
        setIsFetching(true);
      })
  } else if (optionsValue === 'ingrediente') {
    ApiSearchByMainIngredient(searchValue)
      .then((listFood) => {
        setReceitas(listFood);
        noElements(listFood);
      })
      .then(() => {
        setIsFetching(true);
      })
  } else if (optionsValue === 'nome') {
    ApiSearchMealByName(searchValue)
      .then((listFood) => {
        setReceitas(listFood);
        noElements(listFood);
      })
      .then(() => {
        setIsFetching(true);
      })
  }
  return null;
}

function filterDrinks(title, optionsValue, searchValue, setReceitas, setIsFetching) {
  if (optionsValue === 'primeiraLetra') {
    if (searchValue.length !== 1) {
      window.alert('Sua busca deve conter somente 1 (um) caracter');
      return null;
    }
    searchCockTailByLetter(searchValue)
      .then((ListDrinks) => {
        setReceitas(ListDrinks);
        noElements(ListDrinks);
      })
      .then(() => {
        setIsFetching(true);
      });
  } else if (optionsValue === 'ingrediente') {
    searchCockTailByIngredient(searchValue)
      .then((ListDrinks) => {
        setReceitas(ListDrinks);
        noElements(ListDrinks);
      })
      .then(() => {
        setIsFetching(true);
      });
  } else if (optionsValue === 'nome') {
    searchCockTailByName(searchValue)
      .then((ListDrinks) => {
        setReceitas(ListDrinks);
        noElements(ListDrinks);
      })
      .then(() => {
        setIsFetching(true);
      });
  }
  return null;
}

function setupRecom(searchValue, setReceitas, setIsFetching, setSugestFood, setSugestDrink) {
  searchCockTailByName('')
    .then((listDrink) => {
      setSugestDrink(listDrink.slice(0, 6));
    })
    .then(() => {
      setIsFetching(true);
    });

  ApiSearchMealByName('')
    .then((listFood) => {
      setSugestFood(listFood.slice(0, 6));
    })
    .then(() => {
      setIsFetching(true);
    });
}

function funcSearch(tipo, ingrediente, title, setReceitas, setIsFetching) {
  if (tipo === 'comidas') {
    filterFoods(title, 'ingrediente', ingrediente, setReceitas, setIsFetching);
  } else {
    filterDrinks(title, 'ingrediente', ingrediente, setReceitas, setIsFetching);
  }
  return null;
}

function UseFilterOut(title, optionsValue, searchValue, setReceitas, setIsFetching) {
  if (title === 'comidas') {
    filterFoods(title, optionsValue, searchValue, setReceitas, setIsFetching);
  }
  if (title === 'bebidas') {
    filterDrinks(title, optionsValue, searchValue, setReceitas, setIsFetching);
  }
}

export default function Provider({children}) {
  const [isFetching, setIsFetching] = useState(false);
  const [receitas, setReceitas] = useState([]);
  const [optionsValue, setOptionsValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [changeFilter, setchangeFilter] = useState(0);
  const [title, setTitle] = useState('');
  const [sugestDrink, setSugestDrink] = useState([]);
  const [sugestFood, setSugestFood] = useState([]);
  const [redirecionado, setRedirecionado] = useState(false);
  const [email, setEmail] = useState('');

  const state = {
    isFetching,
    receitas,
    optionsValue,
    searchValue,
    changeFilter,
    title,
    sugestDrink,
    sugestFood,
    email,
    redirecionado,
    setIsFetching,
    setReceitas,
    setOptionsValue,
    setSearchValue,
    setchangeFilter,
    setTitle,
    setSugestDrink,
    setSugestFood,
    setEmail,
    funcSearch,
    setRedirecionado,
  };

  useEffect(() => {
    setupRecom(searchValue, setReceitas, setIsFetching, setSugestFood, setSugestDrink);
  }, [])

  useEffect(() => {
    UseFilterOut(title, optionsValue, searchValue, setReceitas, setIsFetching);
  }, [changeFilter])

  return <ReceitasContext.Provider value={state}>{children}</ReceitasContext.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};