import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import { NavLink } from 'react-router-dom';
import styles from './AltNav.css';

class AltNavBar extends Component {
  render() {
    return (
      <AppBar>
        <h4>uTile Devs</h4>
        <NavLink className={styles.about} to="/about"><h4>About</h4></NavLink>

      </AppBar>
    );
  }
}

export default AltNavBar;
