import React, { useRef } from "react";
import './Header.scss'
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { GoHeart } from "react-icons/go";
import Favorites from "../favorites/Favorites";
import { useSelector } from "react-redux";


const logo = 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Movieweb_Logo.png'
const headerNav=[
    {
        display:'Home',
        path:'/'
    },
    {
        display:'movies',
        path:'/movie'
    },
    {
        display:'Tv Series',
        path:'/tv'
    },

   
];
const Header=()=>{
    const {pathname}=useLocation();
    const headerRef=useRef(null);
    const active= headerNav.findIndex(e=>e.path === pathname)
    const favorites = useSelector((state) => state.favorites);
    const cartNumber=favorites.length
    console.log(favorites.length);
    useEffect(()=>{
        const shrinkHeader=()=>{
            if(document.body.scrollTop >100 || document.documentElement.scrollTop >100){
                // @ts-ignore
                headerRef.current.classList.add('shrink')
            }else{
                // @ts-ignore
                headerRef.current.classList.remove('shrink')
            }
        }
        window.addEventListener('scroll',shrinkHeader)
        return ()=>{
            window.removeEventListener('scroll',shrinkHeader)
        }
    },[])

return (
    <>
    <div ref={headerRef} className="header  fixed-top head__baground__shadow" style={{height:'70px'}}>
        <div className="header__wrap container d-flex align-items-center justify-content-between my-3" >
            <div className="logo">
               
                <Link to="/"> <img src={logo} alt="" className="img-fluid bg-dark mx-5" /></Link>
            </div>
            <ul className="header__nav d-flex align-items-center mx-5">
                {
                    headerNav.map((ele,index)=>(
                        <li key={index} className={`${
// @ts-ignore
                        ele === active ? 'active':''} mx-2 text-light`}>
                            <Link to={ele.path} >
                                {ele.display}
                                </Link>
                        </li>
                    ))
                }
                
            </ul>
           <Link to={'/Favorites'}> 
           <div className="cart" style={{position:"relative"}}>
            <span className="cart__number text-light"style={{position:"absolute",top:"-14px",left: "0"}} >{cartNumber}</span>
            <GoHeart style={{fontSize:"48px",color:"red"} }/>
            </div>  </Link>
        </div>
    </div>
    </>
)
}

export default Header;