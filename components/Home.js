import React from "react"; 
import Navbar from "./Navbar"
import Right from './Right';
import Left from './Left';

function Home() {


  return (
    <div className='h-screen'>
      <Navbar/>
      <div className="h-5/6 flex flex-row">
      <Left/>
      <Right/>
      </div>
    </div>
  );
}

export default Home;
