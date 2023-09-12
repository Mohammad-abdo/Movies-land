import React from 'react';
import Header from './Components/Header/Hrader';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from './Components/Footer/Footer';

const AppLayout = () => {


    return (
     <>

     <div >

     <Header/>
     <div className="container">
   
     <Outlet/>

     </div>
     <Footer/>
     </div>
    
   
     
     </>
    );
}

export default AppLayout;