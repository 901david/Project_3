import React, { Component } from 'react';


class AltFooter extends Component {

  render() {
    const styles = {
      basic: {
        width: '100vw',
        background: '#545454',
        height: '50px',
        bottom: '0',
        position: 'fixed',
        color: 'white',
        textAlign: 'center',
        lineHeight: '44px',
      },
    };

    return (
      <div style={styles.basic}>
          <p>&#9400;Copyright 2018 uTile</p>
      </div>
    );
  }
}



export default AltFooter;
