import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
//====================================

import './index.css';
import Game from './components/tutorial-react'

function App(){
  return (
    <Router>
      <div>
        <header>
          <h1><span>learning</span> <span>javascript</span> <span>study</span></h1>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/chapter12'>chapter 12</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
            <li>
              <Link to='/tutorial-react'>React Tutorial</Link>
            </li>
          </ul>
        </header>

        <Switch>
          <Route path='/tutorial-react'>
            <main>
              <Game />
            </main>
          </Route>
          <Route path='/chapter12'>
            <Chapter12 />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function Home(){
  return <main><h2>home</h2></main>;
}
function Chapter12(){
  return <main><h2>Chapter 12 - 이터레이터와 제너레이터</h2></main>;
}
function Users(){
  return <main><h2>users</h2></main>;
}

//====================================
ReactDOM.render(
  <App />,
  document.getElementById('root')
)