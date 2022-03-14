import React from 'react';
import Template from './components/Template/Template'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter } from "react-router-dom";


class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Template>
        </Template>
      </BrowserRouter>
    );
  }
}

export default App;
