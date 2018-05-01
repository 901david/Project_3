import React, { Component } from 'react';


class Footer extends Component {
  render() {
    const styles = {
      basic: {
        width: '100vw',
        background: '#334199',
        height: '50px',
        position: 'fixed',
        bottom: '0',
        color: 'white',
        textAlign: 'center',
        lineHeight: '42px'
      },
      icons: {
        height: '50px',
        fontSize: 25,
        color: '#ddd',
      },
    };

    return (
      <div style={styles.basic}>
            <p>&#9400;Copyright 2018 uTile</p>
      </div>
    );
  }
}



export default Footer;
