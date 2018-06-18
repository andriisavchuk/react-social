import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={ Main } />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;