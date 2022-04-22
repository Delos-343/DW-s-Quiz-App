import React from 'react';
import Home from './components/Home'; //Include Header
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSiswa from './components/loginSiswa'; 
import HalamanGuru from './components/HalamanGuru'; 
import Login from './components/login'; 
import Quiz from './components/Quiz'; 
import Signup from './components/signup';
import EndScreen from './components/EndScreen';

 
function App() {
  

    return (

      //v6 Router React
     <BrowserRouter>
     <Routes>
       <Route path ="/" exact element={<Home/>}/>
       <Route path ="/play/LoginSiswa" exact element={<LoginSiswa/>}/>
       <Route path ="/login" exact element={<Login/>}/>
       <Route path ="/Quiz" exact element={<Quiz/>}/>
       <Route path ="/halamanguru" exact element={<HalamanGuru/>}/>
       <Route path ="/signup" exact element={<Signup/>}/>
       <Route path ="/endscreen" exact element={<EndScreen/>}/>
     </Routes>
     </BrowserRouter>
    );
  
}
export default App;