import React from "react";
import Header from "./components/Header/Header";
import Img_block from "./components/Img_block/Img_block";
import Users from "./components/Users/Users";
import Form from "./components/Form/Form";

import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="wrap">
        <Header/>
        <Img_block/>
        <Users/>
        <Form/>
      </div>
    </div>
  );
}

export default App;
