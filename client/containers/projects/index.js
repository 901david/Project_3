import React, { Component } from 'react';
import ProjLayout from './Layout';
import ButtonBar from '../../components/ButtonBar/Button_Bar';
import styles from './project_style.css';
import CollaboratorsBar from '../../components/Collaborators';
import { connect } from 'react-redux';

class Projects extends Component {
    state = {
      issuesButt: false,
      readmeButt: true,
      matrixButt: false,
      codeButt: false,
      currentProject: null,
      currentScreen: 'readmeButt',
    };
    componentDidMount() {
      this.setState({ currentProject: this.props.currentProject });
    }
    componentWillReceiveProps(nextProps) {
      const { currentProject } = nextProps;
      if (currentProject.id !== this.props.currentProject.id) {
        this.setState({ currentProject });
      }
    }
    whatStateToChange(prop) {
      this.setState({ currentScreen: prop });
    }
    shouldComponentUpdate(nextProps, nextState) {
      if (nextState.currentProject !== this.state.currentProject) {
        return true;
      }
      if (nextState.currentScreen !== this.state.currentScreen) {
        return true;
      }
      return false;
    }
    render() {
      const { currentProject } = this.state;
      if (currentProject !== null) {
        return (
          <div>
            <div className={styles.collab}>
              <h2>Current Repository: {currentProject.name}</h2>

            </div>
              <CollaboratorsBar repoName={currentProject.name} currentUser={currentProject.owner.login} />
            <div className={styles.buttonBox}>
              <ButtonBar currentScreen={this.state.currentScreen} clicker={this.whatStateToChange.bind(this)} />
            </div>
            <div>
              <ProjLayout currentScreen={this.state.currentScreen}  repoName={currentProject.name} currentRepoOwner={currentProject.owner.login} />
            </div>
          </div>
        );
      }
      return (
        <div>
          <div className={styles.loaderContainerTwo}>
            <img className={`center-block ${styles.loaderImageTwo}`} src="./images/uTile_black_loader_100.gif" alt="loader" />
            <h1 className={styles.loaderTextTwo} style={{color:'white'}}>Loading...</h1>
          </div>
        </div>
      );
    }
}

export default connect((state) => ({
  currentProject: state.repos.currentProject,
}), null)(Projects);
