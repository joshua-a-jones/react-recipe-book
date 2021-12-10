import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Recipe from './pages/recipe/Recipe';
import Search from './pages/search/Search';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' >
            <Home />
          </Route>
          <Route path='/create'>
            <Create />
          </Route>
          <Route path='/recipe/:id'>
            <Recipe />
          </Route>
          <Route path='/search'>
            <Search />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
