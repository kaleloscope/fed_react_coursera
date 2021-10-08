import logo from './logo.svg';

import { Navbar, NavbarBrand } from 'reactstrap';
import React, { Component } from 'react';
import Menu from './components/Menu';
import { DISHES } from './shared/dishes';
import Main from './components/Main';



class App extends Component {

  
  
  render() {
    return (
      <div className="App">
        <Main/>
      </div>
    );
  }
}

export default App;
