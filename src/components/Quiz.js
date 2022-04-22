import React, { useState , useContext } from 'react';
import { QuizData } from './QuizData';
import './quiz.scss';
import gql from "graphql-tag";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Button } from 'semantic-ui-react';
import { QuizContext } from "./helpers";
import { useNavigate } from 'react-router-dom'

const Quiz = () => {
    const navigate = useNavigate();
    const [currentQuestion , setcurrentQuestion] = useState(0);
    const [optionChosen , setOptionChosen] = useState();
    const { gameState, setGameState } = useContext(
       QuizContext
      );
    const [score,setScore] = useState(0)
    //const [tampilData,{ data,loading,error}] = useQuery(TAMPIL_SEMUA_SOAL_JAWABAN);


    const nextQuestion = () => {
        if(QuizData[currentQuestion].kuncijawaban == optionChosen){
            setScore(score + 1);
            alert("Benar")
        }

        setcurrentQuestion(currentQuestion +1)
        console.log(score);
    }

    //memilih button / opsi jawaban
    const chooseOption = (option) => {
        setOptionChosen(option);
      };
    
      //kelar quiz
    const finishQuiz = () => {
        if (QuizData[currentQuestion].kuncijawaban == optionChosen) {
          setScore(score + 1);
          alert("Benar")
        }
        navigate('/endscreen')
      };
    

    return (
        <div>
         <div class="header"></div>
        <div class="Quiz">
       

       <div>{QuizData[currentQuestion].soal}</div>

       <div className="options">
       <button  onClick={() => {chooseOption(QuizData[currentQuestion].jawabanA)}}>{QuizData[currentQuestion].jawabanA}</button>
       <button  onClick={() => {chooseOption(QuizData[currentQuestion].jawabanB)}}>{QuizData[currentQuestion].jawabanB}</button>
       <button  onClick={() => {chooseOption(QuizData[currentQuestion].jawabanC)}}>{QuizData[currentQuestion].jawabanC}</button>
       <button  onClick={() => {chooseOption(QuizData[currentQuestion].jawabanD)}}>{QuizData[currentQuestion].jawabanD}</button>
       </div>

       {currentQuestion == QuizData.length - 1 ? (
        <button onClick={finishQuiz} id="nextQuestion">
          Finish Quiz
        </button>
      ) : (
        <button onClick={nextQuestion} id="nextQuestion">
          Next Question
        </button>
      )}
       </div>
       </div>
    )
}
export default Quiz;

const TAMPIL_SEMUA_SOAL_JAWABAN = gql`
    query MyQuery {
      soal {
        id
        kuncijawaban
        soal
        jawabanA
        jawabanB
        jawabanC
        jawabanD
      }
    }
`;
