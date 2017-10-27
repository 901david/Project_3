import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import CardComments from './Card_Comments';
import CardAssignees from './Card_Assignees';
import styles from './issueCards.css';
import Collapsible from 'react-collapsible';
import DropdownTrigger from './Dropdown_Card';
import { closeUserIssue } from '../../actions/githubActions/closeIssueAction';
import { fetchUserComments } from '../../actions/githubActions/getIssueCommentsAction';
import ModalIssueComment from '../Modal/comment_modal';
import { addUserComment } from '../../actions/githubActions/addCommentAction';

class IssueCard extends Component {
  state = {
    isShowingModal: false,
    issuesLoaded: false,
    commentsLoaded: false,
    issues: null,
    issueComments: null,
    newCommentText: '',
    currentIssueNumber: '',
  }
  componentDidMount() {
    // console.log('INTIAL COMMENTS DATA TO SEND OFF ', this.props.repoOwner, this.props.repoName);
    this.props.issues.map((issue) => {
      this.props.fetchUserComments(this.props.repoOwner, this.props.repoName, issue.number, this.props.git_token);
    });
  }
  componentWillReceiveProps(nextProps) {
    // console.log(' WHEN DO WE GET NEW ISSUES?', nextProps.issueComments);
    // console.log("this should show projects connected in state", nextProps.currentProject);
    const { issueComments, issues, repoName, repoOwner } = nextProps;
    // this.setState({ issueComments });
    // console.log('Here are next props in Issue card', repoName, repoOwner);
    const commentsLength = Object.keys(issueComments).length;
    const issuesLength = issues.length;
    if (this.state.issues !== null) {
      if (this.state.issues.length !== issues.length) {
        this.setState({ issues });
      }
    }
    if (commentsLength === issuesLength) {
      // console.log('Issues in Issue Card from next props', issues);
      this.setState({ issueComments, issues, commentsLoaded: true, issuesLoaded: true });
    }
    if (this.state.issueComments !== null) {
      if (issueComments.length !== this.state.issueComments.length) {
        this.setState({ issueComments });
      }
    }
  }
modifyTextState = (event) => {
  this.setState({ newCommentText: event.target.value });
}
handleAddNewComment = () => {
  const { currentIssue } = this.state;
  this.props.addUserComment(this.props.repoOwner, this.props.repoName, currentIssue, this.state.newCommentText, this.props.git_token);
  this.setState({ newCommentText: '' });
  this.handleClose();
}
handleClick = (currentIssue) => this.setState({ isShowingModal: true, currentIssue })
handleClose = () => this.setState({ isShowingModal: false })
handleCloseIssue = (login, repoName, issueNum, token) => {
// console.log('PASSING TO CLOSE ISSUE', login, repoName, issueNum, token);
  this.props.closeUserIssue(login, repoName, issueNum, token);
}
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
render() {
  const { issuesLoaded, commentsLoaded, issues, issueComments, isShowingModal } = this.state;
  const assigneeData = this.props.issues.map((issue, i) => issue.assignees);
  if (issuesLoaded && commentsLoaded) {
    // console.log(this.state.issues, 'THESE ARE MY ISSUES PASSED TO ISSUE CARD RENDER AREA');
    if (isShowingModal) {
      return (
        <div>
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
    return (
      <div className={styles.mainCont}>
        {issues.map((issue, i) => (
          <div key={issue.id}>
            <Collapsible trigger={<DropdownTrigger issueTitle={issue.title} issueNumber={issue.number} />}>
              <Card className={styles.child}>
                <CardTitle
                  avatar={issue.user.avatar_url}
                  title={issue.user.login}
                  //  subtitle={this.state.currentProject.name}
                />
                <CardTitle
                  subtitle={issue.body}
                />
                <CardComments issueComments={issueComments[issue.number]} handleClick={this.handleClick} handleClose={this.handleClose} />
                <h6 style={{ marginLeft: 15 }}>Assignees</h6>
                <CardAssignees assigneesData={assigneeData} indexValue={i} />
                <CardActions>
                  <Button label="Add Comment" onClick={() => this.handleClick(issue.number)} />
                  <Button
                    label="Close Issue"
                    onClick={() => this.handleCloseIssue(this.props.repoOwner, this.props.repoName, issue.number, this.props.git_token)}
                  />
                  {/* <Button label="Add to Matrix" /> */}
                </CardActions>
              </Card>
            </Collapsible>
          </div>
        ),
        )
        }
      </div>
    );
  }
  return (
    <div>
      <div className={styles.loaderContainerThree}>
        <img className={`center-block ${styles.loaderImageThree}`} src="./images/uTile_black_loader_100.gif" alt="loader" />
        <h1 className={styles.loaderTextThree} style={{ color: 'white' }}>Loading...</h1>
      </div>
    </div>
  );
}
}

// export default IssueCard;

export default connect((state, ownProps) => ({
  closedIssData: state.issue,
  currentProject: state.repos.currentProject,
  issueComments: state.comments.issueComments,
  git_profile: state.auth.git_profile,
  git_token: state.auth.github_token,

}), (dispatch) => ({
  closeUserIssue: (userId, repoName, issueNum, token) => dispatch(closeUserIssue(userId, repoName, issueNum, token)),
  fetchUserComments: (userId, repoName, issueNum, token) => dispatch(fetchUserComments(userId, repoName, issueNum, token)),
  addUserComment: (userName, repoName, issueNum, body, token) => dispatch(addUserComment(userName, repoName, issueNum, body, token)),
}))(IssueCard);
