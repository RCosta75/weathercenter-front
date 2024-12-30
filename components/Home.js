import React from "react"; 
import Navbar from "./Navbar"
import Middle from './Middle';
import Left from './Left';
import Right from "./Right";

function Home() {


  return (
    <div className='h-screen'>
      <Navbar/>
      <div className="h-5/6 flex flex-row">
      <Left/>
      <Middle/>
      <Right/>
      </div>
    </div>
  );
}

export default Home;
