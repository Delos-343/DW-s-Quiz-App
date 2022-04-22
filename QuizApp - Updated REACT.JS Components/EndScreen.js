import React , {Fragment , useState} from 'react';
import { useContext } from "react";
import { QuizData } from './QuizData';
import { useNavigate } from 'react-router-dom'

const EndScreen = () => {
const navigate = useNavigate();
const [score,setScore] = useState()
const pulang = () => {
    navigate('/')
  };

return (
  <div id="body">
      <div class="header">
      </div>

      <h1 id="judul">Kuis Kelar</h1>
      <h1 id="hasil"> {score}/{QuizData.length}</h1>

      <button onClick={pulang} id="nextQuestion">
        <p> Pulang Selesai </p>
      </button>
  </div>
)
}
export default EndScreen