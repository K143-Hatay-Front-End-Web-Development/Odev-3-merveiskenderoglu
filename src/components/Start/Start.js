import React, { useContext } from "react";
import styles from "./start.module.css";
import { RedLine, StartCircle } from "../../assets/svg";
import { SelectGameButton } from "../SelectGameButton/SelectGameButton";
import { Context } from "../../context/Context";


const Start = () => {

  const {operator,setOperator,startGame,addQuestion,setQuestions,points,finalStat} = useContext(Context);

  const operators = [
    {
      id: "add",
      text: "Toplama",
    },
    {
      id: "substract",
      text: "Çıkarma",
    },
    {
      id: "multiply",
      text: "Çarpma",
    },
    {
      id: "divide",
      text: "Bölme",
    },
  ];

  const selectGame = (type) =>{
    setOperator(type);
  };


  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Matematik Oyunu</h1>
        <RedLine width={"640"} height={"10"} style={styles.line} />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.score}>
          <h1>Puan : {finalStat.totalScore}</h1>
          <h1>Çözülen Sayısı : {finalStat.totalQuestions}</h1>
          <h1>Yanlış Cevap : {finalStat.totalQuestions - finalStat.correctAnswers} </h1>
          <h1>Doğru Cevap : {finalStat.correctAnswers}</h1>
        </div>
        <div className={styles.select}>
          {operators.map((item,index) => (
            <SelectGameButton 
            onClick={() => selectGame(item.id)}
            isClicked={item.id === operator}
            key={item.id} 
            text={item.text} 
            />
          ))}
        </div>
      </div>

      <div className={styles.start}>
        <StartCircle text={"Start"} onClick={startGame} style={styles.circle}/>
      </div> 
    </div>
  );
};

export default Start;
