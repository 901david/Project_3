import React, { Component } from 'react';
import Markdown from 'react-remarkable';
import convertLinks from './convert_readme_links.js';
import styles from './readme_style.css';


class RenderMarkdown extends Component {
  render() {
    const readMeConverted = this.props.readme.toString();
    const readMeWithImages = convertLinks(readMeConverted, this.props.userName, this.props.repoName);

    if (readMeConverted === 'Unfortunately, there is currently no read me created.  Get started by creating one on GitHub') {
      return (
        <div className={styles.noReadMe}>
          <h3>No Readme Currently Created.  Visit GitHub to create one.</h3>
        </div>
      );
    }

    return (
      <div className={styles.readmeBox}>
        <Markdown source={readMeWithImages} />
      </div>
    );
  }
}

export default RenderMarkdown;
