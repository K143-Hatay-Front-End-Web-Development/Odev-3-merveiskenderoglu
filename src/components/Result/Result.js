import React from 'react'
import { ResultLine, StartCircle, QuestionLine, TrueIcon, FalseIcon } from '../../assets/svg';
import styles from './result.module.css'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';





const Result = () => {

  const {setQuestionCount, trueAnswerCount, points,showQuestions} = useContext(Context);


  const navigate = useNavigate();

  const returnStart = () => {
    setQuestionCount(0);
    navigate('/');
  }
  
  console.log(showQuestions);
  console.log(trueAnswerCount);


  return (
    <div className={styles.resultContent}>
        <div className={styles.results}>
            <h1>Sonuç</h1>
            <ResultLine style ={styles.line}/>
            <h2>Puan : {points} </h2>
            <h2>Doğru Cevap : {trueAnswerCount && trueAnswerCount}</h2>
            <h2>Yanlış Cevap : { trueAnswerCount && 10-trueAnswerCount}</h2>
            <h3>Başa Dön</h3>
            <StartCircle onClick={returnStart} style={styles.circle}/>
        </div>
        <div className={styles.questions}>
            <h1>Sorular</h1>
            <QuestionLine style = {styles.questionLine}/>
            {showQuestions && showQuestions.map((item,index) => (
              <div className = {styles.questionList} key={index}>{item.boardQuestion} {(item.isAnswerTrue === true) ? <TrueIcon/> : <FalseIcon/>  }</div>
            ))}
        </div>
    </div>
  )
}

export default Result;