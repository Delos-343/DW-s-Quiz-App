import React , {Fragment} from 'react';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.scss';
// import Button from '@mui/material/Button';



const Home = () => (
    <Fragment>
    <div class ="header">
    </div>
    
    <div id="home">
    <section>
        
    <div id="judul">
        <h1>
            MathQuizApp
        </h1>  
    </div>
    <div id="keterangan">
        <p>
            Free Quiz For All Students and Teacher
        </p> 
    </div>
    <div className="play-button-container">
    <Link className="play-button" to="/play/LoginSiswa">
        Play
    </Link>
    </div>

    <div className="auth-container">
    <Link to="/login" className="auth-buttons" to="/login" id="login-button">
        Login
    </Link>
    <Link to="/register" className="auth-buttons" to="/signup" id="signup-button">
        Sign Up
    </Link>
    </div>
    </section>
    </div>
    </Fragment>
)

export default Home