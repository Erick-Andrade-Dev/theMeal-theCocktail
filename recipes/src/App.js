import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import DetailDrink from './pages/DetailDrink';
import DetailFood from './pages/DetailFood';
import Explorer from './pages/Explorer';
import Login from './pages/Login';
import Main from './pages/Main';
import ExplorerFoodsAndDrinks from './pages/ExplorerFoodAndDrinks';
import ListOfPlaces from './pages/FIlterPlace';
import FilterByIngredient from './pages/FilterIngredient';
import Profile from './pages/Profile';
import FavoritesRecipes from './pages/FavoritesRecipes';
import RecipesInProgress from './pages/RecipesInProgress';
import DoneRecipe from './pages/DonesRecipes';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={ Login }/>
      <Route path="/comidas/:id_da_receita/in-progress" component={ RecipesInProgress } />
      <Route path="/bebidas/:id_da_receita/in-progress" component={ RecipesInProgress } />
      <Route path="/explorar/comidas/ingredientes" component={ FilterByIngredient } />
      <Route path="/explorar/bebidas/ingredientes" component={ FilterByIngredient } />
      <Route path="/comidas/:id_da_receita" component={ DetailFood } />
      <Route path="/bebidas/:id_da_receita" component={ DetailDrink } />
      <Route exact path='/comidas' component={ Main }/>
      <Route exact path='/bebidas' component={ Main }/>
      <Route exact path='/explorar' component={ Explorer }/>
      <Route exact path="/explorar/comidas/area" component={ ListOfPlaces } />
      <Route exact path='/explorar/comidas' component={ ExplorerFoodsAndDrinks }/>
      <Route exact path='/explorar/bebidas' component={ ExplorerFoodsAndDrinks }/>
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-favoritas" component={ FavoritesRecipes } />
      <Route path="/receitas-feitas" component={ DoneRecipe } />
    </Switch>
  );
}

export default App;
