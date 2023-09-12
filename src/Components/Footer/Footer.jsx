import React from "react";
import { Link } from "react-router-dom";
import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/tmovie.png';
import './footer.scss'

const Footer = () => {
    return (
        <div className="footer3 mt-" style={{backgroundImage: `url(${bg})`}}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <Link className="text-light "to="/">tMovies</Link>
                    </div>
                </div>
                <div className="footer__content__menus my-4">
                    <div className="footer__content__menu">
                        <Link className="text-light " to="/">Home</Link>
                        <Link className="text-light "to="/">Contact us</Link>
                        <Link className="text-light "to="/">Term of services</Link>
                        <Link className="text-light "to="/">About us</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link className="text-light "to="/">Live</Link>
                        <Link className="text-light "to="/">FAQ</Link>
                        <Link className="text-light "to="/">Premium</Link>
                        <Link className="text-light "to="/">Pravacy policy</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link className="text-light "to="/">You must watch</Link>
                        <Link className="text-light "to="/">Recent release</Link>
                        <Link className="text-light "to="/">Top IMDB</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;