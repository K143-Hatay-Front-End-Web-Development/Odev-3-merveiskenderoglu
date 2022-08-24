import React from 'react';
import { TrueIcon } from '../../assets/svg';
import styles from './selectGame.module.css'


export const SelectGameButton = (props) => {

  return (
    <div 
    className={styles.selectButton}
    onClick={props.onClick}
    >
        {props.text} {props.isClicked && <TrueIcon/>}
    </div>
  )
}

