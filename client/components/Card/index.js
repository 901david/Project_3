import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styles from './issueCards.css';
import { closeUserIssue } from '../../actions/githubActions/closeIssueAction';
import { fetchUserComments } from '../../actions/githubActions/getIssueCommentsAction';
import ModalIssueComment from '../Modal/comment_modal';
import { addUserComment } from '../../actions/githubActions/addCommentAction';
import IssuePullModal from '../Modal/newissuePull_Modal';
import { convertDate } from '../EventFeed/logical_solutions';
import { addNewAssignees } from '../../actions/githubActions/addAssigneesAction';
import { removeNewAssignees } from '../../actions/githubActions/removeAssigneesAction';
import Markdown from 'react-remarkable';

class IssueCard extends Component {
  state = {
    isShowingModal: false,
    issuesLoaded: false,
    commentsLoaded: false,
    assigneesLoaded: false,
    issues: null,
    issueComments: null,
    newCommentText: '',
    currentIssueNumber: '',
    currentModalState: '',
    assigneeData: null,
      noIssues: false,
  };

  componentDidMount() {
      this.props.handleRefresh();
      if(!this.state.issues) {
      const currentState = this.state;
      this.setState({ ...currentState, issuesLoaded: true, commentsLoaded: true, assigneesLoaded: true, noIssues: true });
    }
    else {
        this.props.issues.map((issue) => {
            this.props.fetchUserComments(this.props.repoOwner, this.props.repoName, issue.number, this.props.git_token);
        });
    }

  }
  componentWillReceiveProps(nextProps) {
    const { issueComments, issues } = nextProps;
    const commentsLength = Object.keys(issueComments).length;
    const issuesLength = issues.length;
    if (this.state.issues !== null) {
        const currentState = this.state;
        if (this.props.issues.length !== issues.length) {
            const haveIssues = !issues ? false : true;
        // this.setState({ ...currentState, issuesLoaded: false });
        const assigneeData = this.props.issues.map((issue) => issue.assignees);
        this.setState({ ...currentState, issues, issuesLoaded: true, assigneeData, assigneesLoaded: true, noIssues: haveIssues });
        issues.map((issue) => {
          this.props.fetchUserComments(this.props.repoOwner, this.props.repoName, issue.number, this.props.git_token);
        });
      }
    }
    if (commentsLength === issuesLength) {
      const assigneeData = this.props.issues.map((issue) => issue.assignees);
        const haveIssues = issues.length === 0;
        this.setState({ issueComments, issues, commentsLoaded: true, issuesLoaded: true, assigneeData, assigneesLoaded: true, noIssues: haveIssues });
    }
    if (this.state.issueComments !== null) {
      if (issueComments.length !== this.state.issueComments.length) {
        const currentState = this.state;
        this.setState({ ...currentState, issueComments });
      }
    }
  }
handleModalStateChange = (state) => {
    const currentState = this.state;
  this.setState({ ...currentState, currentModalState: state });
};
modifyTextState = (event) => {
  const currentState = this.state;
  this.setState({ ...currentState, newCommentText: event.target.value });
};
handleAddNewComment = () => {
  const { currentIssue } = this.state;
  this.props.addUserComment(this.props.repoOwner, this.props.repoName, currentIssue, this.state.newCommentText, this.props.git_token);
  const currentState = this.state;
  this.setState({ ...currentState, newCommentText: '' });
  this.handleClose();
};
handleClick = (currentIssue) => {
  const currentState = this.state;
  this.setState({ ...currentState, isShowingModal: true, currentIssue });
}
handleClose = () => {
  const currentState = this.state;
  this.setState({ ...currentState, isShowingModal: false });
}
handleCloseIssue = (login, repoName, issueNum, token) => {
  this.props.closeUserIssue(login, repoName, issueNum, token);
};
handleAddAssignees = (assignees) => {
  const currentState = this.state;
  this.setState({ ...currentState, assigneesLoaded: false });
  this.props.addNewAssignees(this.props.repoOwner, this.props.repoName, this.props.currentIssueNumber, assignees, this.props.git_token);
  this.props.handleIssuePullClose();
};
handleRemoveAssignees = (assignees) => {
    const currentState = this.state;
    this.setState({ ...currentState, assigneesLoaded: false });
  this.props.removeNewAssignees(this.props.repoOwner, this.props.repoName, this.props.currentIssueNumber, assignees, this.props.git_token);
  this.props.handleIssuePullClose();
};
componentWillUnmount() {
    console.log('i just unmounted');
}

render() {
  console.log('here is my card State', this.state);
  const { issuesLoaded, commentsLoaded, assigneesLoaded } = this.state;
  if (issuesLoaded && commentsLoaded && assigneesLoaded && !this.state.noIssues) {
    const { issues, issueComments } = this.state;
    return (
      <div className={`card-group ${styles.mainCont}`}>
        {issues.map((issue, i) => (
          <div className="col-sm-6" key={issue.id}>
            <div className={`card ${styles.boxShad}`}>
              <div className="card-header" data-toggle="collapse" href={`#collapse${issue.number}`} >{`${issue.title} -  ${issue.pull_request ? 'Pull Request' : 'Issue'} #${issue.number}`}
              </div>
              <div id={`collapse${issue.number}`} className={`card-block collapse`}>
                <img className={`${styles.avatarFix} pull-left`} src={issue.user.avatar_url} alt="user" />
                <h6 className={`card-title pull-left ${styles.titleBump}`}>{`Opened By ${issue.user.login}`}</h6>
                <br />
                <br />
                <Markdown className="card-text" source={`${issue.body}`} />
                <br />
                <div>
                  {issueComments[issue.number].map((comment) => (
                    <div key={comment.id}>
                      <br />
                      <h6 className={styles.byWho}>{ `Comment by ${comment.user.login}${convertDate(comment.created_at)}` }</h6>
                      <Markdown className="card-text" source={`${comment.body}`} />
                    </div>
                  ),
                  )
                  }
                </div>
                <h5 style={{ marginTop: 5 }}>Current Assignees:</h5>
                <div className={styles.mainContAss} >
                  { this.state.assigneeData[i].map((assignee) => (
                    <div key={assignee.id}>
                      <img className={`${styles.avatarFix} pull-left`} src={assignee.avatar_url} alt="user" />
                    </div>
                  ))}
                </div>
                <div className={styles.buttonOrganizer}>
                  <div style={{ marginRight: 5 }} className={`btn btn-primary`} onClick={() => this.handleClick(issue.number)}>Comment</div>
                  <div style={{ marginRight: 5 }} className={`btn btn-primary`} onClick={() => this.handleCloseIssue(this.props.repoOwner, this.props.repoName, issue.number, this.props.git_token)}>Close</div>
                  <div className={`btn btn-primary`} onClick={() => this.props.handleModalState('assignee', issue.number)}>Assignees</div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <IssuePullModal assigneeData={this.state.assigneeData} modalState={this.props.modalState} handleCreateIssueData={this.props.handleCreateIssueData} collabs={this.props.collabs} isShowing={this.props.issueModalState} handleAddAssignees={this.handleAddAssignees} handleIssuePullClick={this.props.handleIssuePullClick} handleIssuePullClose={this.props.handleIssuePullClose} handleRemoveAssignees={this.handleRemoveAssignees} />

        <ModalIssueComment
          changeHandler={this.modifyTextState}
          handleClick={this.handleClick}
          handleClose={this.handleClose}
          isShowingModal={this.state.isShowingModal}
          value={this.state.newCommentText}
          handleAddComment={this.handleAddNewComment}
        />

      </div>
    );
  }
  else if (this.state.noIssues && issuesLoaded && commentsLoaded && assigneesLoaded) {
      return (
          <div>
              <h1 style={{textAlign: 'center', marginTop: '5%'}}>There are currently no Issues</h1>
          </div>
      );
  }
  else {
      return (
          <div className={styles.loaderContainerThree}>
              <img className={`center-block ${styles.loaderImageThree}`} src="./images/uTile_black_loader_100.gif"
                   alt="loader"/>
          </div>
      );


  }
}
}

// export default IssueCard;

export default connect((state, ownProps) => ({
  collabs: state.collabs.collabs,
  closedIssData: state.issue,
  currentProject: state.repos.currentProject,
  issueComments: state.comments.issueComments,
  git_profile: state.auth.git_profile,
  git_token: state.auth.github_token,
  // branches: state.branches.branches,
}), (dispatch) => ({
  closeUserIssue: (userId, repoName, issueNum, token) => dispatch(closeUserIssue(userId, repoName, issueNum, token)),
  fetchUserComments: (userId, repoName, issueNum, token) => dispatch(fetchUserComments(userId, repoName, issueNum, token)),
  addUserComment: (userName, repoName, issueNum, body, token) => dispatch(addUserComment(userName, repoName, issueNum, body, token)),
  addNewAssignees: (userName, repoName, issueNum, assignees, token) => dispatch(addNewAssignees(userName, repoName, issueNum, assignees, token)),
  removeNewAssignees: (userName, repoName, issueNum, assignees, token) => dispatch(removeNewAssignees(userName, repoName, issueNum, assignees, token)),
}))(IssueCard);
