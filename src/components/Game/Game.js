import React, { useEffect } from 'react';
import { Question, AnswerCircle1, AnswerCircle2, AnswerCircle3, QuestionFace, TrueFace, FalseFace} from '../../assets/svg';
import styles from './game.module.css';
import { Context } from '../../context/Context';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Game = () => {

const {tour,points,questionCount,createQuestions,operator,questions, checkAnswer, btnId,boardQuestion, bgColor,btnClicked ,face, showQuestions, trueAnswerCount, setFinal} = useContext(Context);

useEffect(() => {
  createQuestions(operator);
},[])


const [fillObj, setFillObj] = useState({ a1: 'white', a2: 'white', a3: 'white' });

const changeFillColors = (switchMain, switchKey1, switchKey2, colorName) => {
  switch (switchMain) {
    case switchKey1:
      setFillObj(prevState => ({ ...prevState, a1: colorName }));
      break;
    case switchKey2:
      setFillObj(prevState => ({ ...prevState, a2: colorName }));
      break;
    default:
      setFillObj(prevState => ({ ...prevState, a3: colorName }));
  }
};

useEffect(() => {
  if (btnId !== null) {
    changeFillColors(btnId, 0, 1, 'black');

    if (questions[questionCount]?.result !== questions[questionCount]?.choices[btnId]) {
      changeFillColors(questions[questionCount]?.result, questions[questionCount]?.choices[0], questions[questionCount]?.choices[1], 'green');
    }

  } else {
    setFillObj({ a1: 'white', a2: 'white', a3: 'white' });
  }
}, [btnId]);

const navigate = useNavigate();

useEffect(() => {
  if ((questionCount) > 9) {
    // setTotalResultToStorage();
    setFinal();
    navigate('/end');
  }
}, [questionCount]);

console.log(showQuestions);
console.log(trueAnswerCount);

  return (
    <div style = {{backgroundColor : bgColor}} className={styles.game}>
        <div className={styles.header}>
            <h3>Puan :{points}</h3>
            <h3>Tur :{tour}</h3>
            <h3>Soru :{questionCount+1}</h3>
        </div>
        <div >
            <Question text={boardQuestion}/>
            {(face ===true)? <TrueFace/> : (face ===false)? <FalseFace/> : <QuestionFace />}
            <AnswerCircle1 clicked={btnClicked}fill={fillObj.a1} checkAnswer={checkAnswer} text={questions[questionCount]?.choices[0]}/>
            <AnswerCircle2 clicked={btnClicked} fill={fillObj.a2} checkAnswer={checkAnswer} text={questions[questionCount]?.choices[1]}/>
            <AnswerCircle3 clicked={btnClicked} fill={fillObj.a3} checkAnswer={checkAnswer} text={questions[questionCount]?.choices[2]}/>
        </div>
    </div>
  )
}

export default Game;