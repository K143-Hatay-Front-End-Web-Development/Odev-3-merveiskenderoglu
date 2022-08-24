import React, { createContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Context = createContext();

const Provider = (props) => {

    const [operator,setOperator] = useState("");
    const [points,setPoints] = useState(0);
    const [tour,setTour] = useState(0);
    const [questions,setQuestions] = useState([]);
    const [questionCount, setQuestionCount] = useState(0);
    const [btnClicked,setBtnClicked] = useState(null);
    const [btnId,setBtnId] = useState(null);
    const [showQuestions, setShowQuestions] = useState([]);
    const [trueAnswerCount,setTrueAnswerCount] = useState(0);
    const [bgColor, setBgColor] = useState("2d2d2d");
    const [face, setFace] = useState(null);
    const [finalStat,setFinalStat] = useState({totalScore:0,totalQuestions:0,correctAnswers:0})

    const navigate = useNavigate();

    const startGame = () => {
        if(!operator){
        return;
        }

        if(operator){
            setTour(tour+1);
            navigate ('/play');
        }
    };

    const createQuestions = (operator) => {
        const newArr = []; 

        for (let i = 0; i < 10; i++) {
          if (operator === 'add') {
            newArr.push(addQuestion('add'));
          } else if (operator === 'substract') {
            newArr.push(substractQuestion());
          } else if (operator === 'multiply') {
            newArr.push(multiplyQuestion());
          } else if (operator === 'divide') {
            newArr.push(divideQuestion());
          }
        }
    
        setQuestions(newArr);
    };

    const randomNumber = (lowerLimit,upperLimit) => {
        return Math.floor(Math.random()*upperLimit)+lowerLimit;
    };



    //creating addition questions

    const addQuestion = (operator) => {
        let num1 = randomNumber(1,98);
        let num2 = randomNumber(1,98-num1);
        let result = num1 + num2;
        let choicesArr=[result+2,result+5,result];
        // console.log(choicesArr);
        let choices= choicesArr.sort(() => Math.random() - 0.5);
        let createdQuestion = { num1,operator,num2,result,point:2,choices}
        return createdQuestion;
    }

    const multiplyQuestion = (operator) => {
      let num1 = randomNumber(1,9);
      let num2 = randomNumber(1,9);
      let result = num1*num2;
      let choicesArr=[(num1-1)*num2,(num1-2)*num2,result];
      // console.log(choicesArr);
      let choices= choicesArr.sort(() => Math.random() - 0.5);
      let createdQuestion = { num1,operator,num2,result,point:4,choices}
      return createdQuestion;
  }


  const substractQuestion = (operator) => {
    let num1 = randomNumber(1,99);
    let num2 = randomNumber(1,num1-1);
    let result = num1 - num2;
    let choicesArr=[result+2,result+5,result];
    // console.log(choicesArr);
    let choices= choicesArr.sort(() => Math.random() - 0.5);
    let createdQuestion = { num1,operator,num2,result,point:3,choices}
    return createdQuestion;
}

const divideQuestion = (operator) => {
  let num2 = randomNumber(1,9);
  let num1 = randomNumber(1,9)*num2;
 
  let result = num1 / num2;
  let choicesArr=[result+2,result+1,result];
  // console.log(choicesArr);
  let choices= choicesArr.sort(() => Math.random() - 0.5);
  let createdQuestion = { num1,operator,num2,result,point:5,choices}
  return createdQuestion;
}

  




    let symbol;

  switch(operator){
    case 'add':
      symbol = '+'
    break;
    case 'substract':
      symbol = '-'
    break;
    case 'multiply' :
      symbol = 'x'
    break;
    case 'divide' :
      symbol = '/'
    break;
    default :
      symbol = ""
  }




const boardQuestion = `${questions[questionCount]?.num1} ${symbol} ${questions[questionCount]?.num2}`

    const checkAnswer = (choice, btnId) => {
      const isTrue = choice === questions[questionCount]?.result;
      setBtnClicked(true);
      setBtnId(btnId);
      
      if (isTrue) { 
        setShowQuestions([...showQuestions, {
            boardQuestion,
            isAnswerTrue: true
        }]);
        setTrueAnswerCount(trueAnswerCount + 1);
        setBgColor('green');
        setFace(true);
    } else {
        setShowQuestions([...showQuestions, {
            boardQuestion,
            isAnswerTrue: false
        }]);
        setBgColor('red');
        setFace(false);
    }

    setTimeout(() => {
      if (isTrue) {
          setPoints(points+ questions[questionCount]?.point);
      }
      setBgColor('#2d2d2d');
      setFace(null);
      setQuestionCount(questionCount + 1);
      setBtnId(null);
      setBtnClicked(false);
    }, 2000);
    }


    const setFinal =  (data) => {
      if(data) {
        setFinalStat(data);
      }else{
        setFinalStat(
          prevState => ({
            ...prevState,
            totalScore : prevState.totalScore + points,
            totalQuestions : prevState.totalQuestions + questionCount,
            correctAnswers : prevState.correctAnswers + trueAnswerCount
          })
        )
      }
     
    }

    useEffect(() => { 
      localStorage.setItem('finalStat', JSON.stringify(finalStat));
  }, [finalStat]);

  useEffect(() => { 
      localStorage.setItem('tour', JSON.stringify(tour));
  }, [tour]);




  console.log(showQuestions);
  console.log(trueAnswerCount);

    return(
        <Context.Provider 
        value={{
            operator,setOperator, 
            points,setPoints,
            tour,setTour,
            questions,setQuestions,
            questionCount,setQuestionCount,
            btnClicked,setBtnClicked,
            btnId,setBtnId,
            bgColor,
            startGame,
            createQuestions,
            checkAnswer,
            face, setFace,
            boardQuestion,
            showQuestions,
            trueAnswerCount,
            finalStat,setFinalStat,
            setFinal,
        }}>
            {props.children}
        </Context.Provider>
    )
}

export default Provider;