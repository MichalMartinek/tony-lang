import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Board from './Board'
import '../style.css'

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/about-us">About</Link>
          <Link to="/board">Board</Link>
        </header>
    
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
          <Route exact path="/board" component={Board} />
        </main>
      </div>
    );
  }
}

export default App


