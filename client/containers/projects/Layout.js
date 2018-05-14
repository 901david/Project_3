import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './project_style.css';
import IssueCard from '../../components/Card/index';
import ReadMe from '../../components/Readme/Readme_Render';
import CodeEditorParent from '../../components/CodeEditor';
import { fetchUserIssues } from '../../actions/githubActions/getIssuesAction';
import { fetchUserReadme } from '../../actions/githubActions/getReadmeAction';
import Matrix from '../../components/Matrix/Matrix';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { createUserIssue } from '../../actions/githubActions/createIssueAction';
import { getRepoBranches } from '../../actions/githubActions/getBranchesAction';

class ProjLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      readme: null,
      repoName: '',
      currentRepoOwner: null,
      issuePullModalShowing: false,
      modalShowState: '',
      currentIssueNumber: '',
    };
  }
  componentDidMount() {
    this.props.fetchUserReadme(this.props.currentRepoOwner, this.props.repoName, this.props.git_token);
    this.props.fetchUserIssues(this.props.currentRepoOwner, this.props.repoName, this.props.git_token);
  }
  componentWillReceiveProps(nextProps) {
    const { userIssues, readme, repoName, currentRepoOwner } = nextProps;
    if (this.state.issues !== userIssues) {
      const currentState = this.state;
      this.setState({ ...currentState, issues: userIssues });
    }
    if (currentRepoOwner !== null || currentRepoOwner !== this.state.currentRepoOwner) {
      this.setState({ currentRepoOwner });
      if (repoName) {
        if (repoName !== this.state.repoName) {
          this.props.fetchUserReadme(currentRepoOwner, repoName, this.props.git_token);
          this.props.fetchUserIssues(currentRepoOwner, repoName, this.props.git_token);
        }
      }
    }
    if (readme.length !== 0) {
      this.setState({ readme, repoName });
    }
    if (userIssues !== null) {
      this.setState({ issues: userIssues, readme });
    }
  }
  handleModalShowState = (state, issueNum) => {
    this.setState({ modalShowState: state, currentIssueNumber: issueNum });
    this.setState({ issuePullModalShowing: true });
  }
  handleRefresh = () => {
    this.props.fetchUserIssues(this.state.currentRepoOwner, this.state.repoName, this.props.git_token);
  }
  handleCreateIssueData = (title, body, assignees) => {
    this.props.createUserIssue(this.state.currentRepoOwner, this.state.repoName, this.props.git_token, title, body, assignees);
    this.handleIssuePullClose();
  }
  handleIssuePullClick = () => {
    this.handleModalShowState('issue', '');
    this.setState({ issuePullModalShowing: true });
  }
  handleIssuePullClose = () => {
    this.setState({ issuePullModalShowing: false });
  }
  whatStateToUse = (screen) => {
    switch (screen) {
      case 'readmeButt':
        return (
          <div>
            <ReadMe
              repoName={this.state.repoName}
              userName={this.state.currentRepoOwner}
              readme={this.state.readme === null ? 'Unfortunately, there is currently no read me created.  Get started by creating one on GitHub' : this.state.readme}
            />
          </div>
        );
      case 'issuesButt':
        if (this.props.fork) {
          return this.whatStateToUse('readmeButt');
        }

        return (
          <div>
            <div className={styles.issueButtons}>
              <MuiThemeProvider>
                <Card className={styles.buttonPos} style={{ width: 350 }}>
                  <CardActions>
                    <FlatButton label="New" onClick={this.handleIssuePullClick} />
                  </CardActions>

                </Card>

              </MuiThemeProvider>
              <MuiThemeProvider>
                <Card
                  className={styles.buttonPos}
                  style={{ width: 350, cursor: 'pointer' }}
                  onClick={this.handleRefresh}
                >
                  <CardActions>
                    <FlatButton label="Refresh" onClick={this.handleRefresh} />
                  </CardActions>

                </Card>

              </MuiThemeProvider>

            </div>
            <div>
              <IssueCard
                handleCardExpansion={this.handleCardExpansion}
                handleCreateIssueData={this.handleCreateIssueData}
                modalState={this.state.modalShowState}
                handleIssuePullClose={this.handleIssuePullClose}
                issueModalState={this.state.issuePullModalShowing}
                currentIssueNumber={this.state.currentIssueNumber}
                handleModalState={this.handleModalShowState}
                handleIssuePullClick={this.handleIssuePullClick}
                handleRefresh={this.handleRefresh}
                issues={this.state.issues}
                assigneeData={this.state.issues.map((issue) => issue.assignees) }
                repoName={this.state.repoName}
                repoOwner={this.state.currentRepoOwner}
              />
            </div>
          </div>
        );

      case 'matrixButt':
        return (
          <div>
            <Matrix />
          </div>
        );
      case 'codeButt':
        return (
          <div>
            <CodeEditorParent />
          </div>
        );
      default:
        return (
          <div>
              Houston....We have a problem.
          </div>
        );
    }
  }
  render() {
    return (
      <div className={styles.layout}>
        {this.whatStateToUse(this.props.currentScreen)}
      </div>
    );
  }
}


export default connect((state, ownProps) => ({
  userIssues: state.issues.repoIssues,
  modifiedIssue: state.issues.modifiedIssue,
  readme: state.readme.readme,
  git_profile: state.auth.git_profile,
  git_token: state.auth.github_token,
  // branches: state.branches.branches ,
}), (dispatch) => ({
  fetchUserIssues: (userId, repoName, token) => dispatch(fetchUserIssues(userId, repoName, token)),
  fetchUserReadme: (userId, repoName, token) => dispatch(fetchUserReadme(userId, repoName, token)),
  getRepoBranches: (userId, repoName, token) => dispatch(getRepoBranches(userId, repoName, token)),
  createUserIssue: (userId, repoName, token, title, body, assignees) => dispatch(createUserIssue(userId, repoName, token, title, body, assignees)),
}))(ProjLayout);
