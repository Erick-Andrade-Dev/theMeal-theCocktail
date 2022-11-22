import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import DetailDrink from './pages/DetailDrink';
import DetailFood from './pages/DetailFood';
import Explorer from './pages/Explorer';
import Login from './pages/Login';
import Main from './pages/Main';
import ExplorerFoodsAndDrinks from './pages/ExplorerFoodAndDrinks';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={ Login }/>
      <Route path="/comidas/:id_da_receita" component={ DetailFood } />
      <Route path="/bebidas/:id_da_receita" component={ DetailDrink } />
      <Route path='/comidas' component={ Main }/>
      <Route path='/bebidas' component={ Main }/>
      <Route exact path='/explorar' component={ Explorer }/>
      <Route exact path='/explorar/comidas' component={ ExplorerFoodsAndDrinks }/>
      <Route exact path='/explorar/bebidas' component={ ExplorerFoodsAndDrinks }/>
    </Switch>
  );
}

export default App;
