import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import DetailDrink from './pages/DetailDrink';
import DetailFood from './pages/DetailFood';
import Login from './pages/Login';
import Main from './pages/Main';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={ Login }/>
      <Route path="/comidas/:id_da_receita" component={ DetailFood } />
      <Route path="/bebidas/:id_da_receita" component={ DetailDrink } />
      <Route path='/comidas' component={ Main }/>
      <Route path='/bebidas' component={ Main }/>
    </Switch>
  );
}

export default App;
