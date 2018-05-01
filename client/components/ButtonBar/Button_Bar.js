import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import styles from './button_styles.css';
const ButtonBar = (props) => {
  return (
    <div>
      <Button
          style={{color: props.currentScreen === 'readmeButt' ? 'white' : 'black'}}
          disabled={props.currentScreen === 'readmeButt' }
          className={`${styles.buttonChoice} ${props.currentScreen === 'readmeButt' ? styles.selected: ''}`}
          onClick={()=> props.clicker('readmeButt')}
          label='Readme' />
      <Button
          style={{color: props.currentScreen === 'issuesButt' ? 'white' : 'black'}}
          disabled={props.currentScreen === 'issuesButt' }
          className={`${styles.buttonChoice} ${props.currentScreen === 'issuesButt' ? styles.selected: ''}`}
          onClick={()=> props.clicker('issuesButt')}
          label='Issues' />
      <Button
          style={{color: props.currentScreen === 'matrixButt' ? 'white' : 'black'}}
          disabled={ props.currentScreen === 'matrixButt' }
          className={`${styles.buttonChoice} ${props.currentScreen === 'matrixButt' ? styles.selected: ''}`}
          onClick={()=> props.clicker('matrixButt')}
          label='Matrix' />
      <Button
          style={{color: props.currentScreen === 'codeButt' ? 'white' : 'black'}}
          disabled={ props.currentScreen === 'codeButt' }
          className={`${styles.buttonChoice} ${ props.currentScreen === 'codeButt' ? styles.selected: ''}` }
          onClick={()=> props.clicker('codeButt')}
          label='Code Editor' />
    </div>
  );
}

export default ButtonBar;
