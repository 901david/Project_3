import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import styles from './button_styles.css';
class ButtonBar extends Component {
    doWeHaveAFork(forkVal) {
        if(forkVal) {
            return (
                ``
            );
        }
        else {
            return (
                <Button
                    style={{color: this.props.currentScreen === 'issuesButt' ? 'white' : 'black'}}
                    disabled={this.props.currentScreen === 'issuesButt'}
                    className={`${styles.buttonChoice} ${this.props.currentScreen === 'issuesButt' ? styles.selected : ''}`}
                    onClick={() => this.props.clicker('issuesButt')}
                    label='Issues'/>
            );
        }
    }
    render() {
        return (
            <div className={styles.buttonContainer}>
                <Button
                    style={{color: this.props.currentScreen === 'readmeButt' ? 'white' : 'black'}}
                    disabled={this.props.currentScreen === 'readmeButt'}
                    className={`${styles.buttonChoice} ${this.props.currentScreen === 'readmeButt' ? styles.selected : ''}`}
                    onClick={() => this.props.clicker('readmeButt')}
                    label='Readme'/>
                {this.doWeHaveAFork(this.props.fork)}
                <Button
                    style={{color: this.props.currentScreen === 'matrixButt' ? 'white' : 'black'}}
                    disabled={this.props.currentScreen === 'matrixButt'}
                    className={`${styles.buttonChoice} ${this.props.currentScreen === 'matrixButt' ? styles.selected : ''}`}
                    onClick={() => this.props.clicker('matrixButt')}
                    label='Matrix'/>
                <Button
                    style={{color: this.props.currentScreen === 'codeButt' ? 'white' : 'black'}}
                    disabled={this.props.currentScreen === 'codeButt'}
                    className={`${styles.buttonChoice} ${ this.props.currentScreen === 'codeButt' ? styles.selected : ''}`}
                    onClick={() => this.props.clicker('codeButt')}
                    label='Code Editor'/>
            </div>
        );
    }
}

export default ButtonBar;
