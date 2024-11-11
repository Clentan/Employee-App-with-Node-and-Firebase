import Navbar from "./component/Navbar/Navbar";
import "./App.css";
import User from './component/Users/App'
import Cart from './component/LoginAdd.jsx/Cart'
import Modal from "./component/LoginAdd.jsx/Modal";
import { useState } from "react";
import Sign from './component/pages/sign'





function App() {



  return (
//here i am possing the values that i need them to accesibe to parents cmponent


    <div className="App">
      <Navbar />
      <User className='py-10' />
      <Cart/>
      <Modal/>
      <Sign/>
    </div>
 
  );
}

export default App;
