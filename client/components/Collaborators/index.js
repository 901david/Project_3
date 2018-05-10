import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chip from './Collab_Chip';
import { fetchCollaborators } from '../../actions/githubActions/getCollabAction';

class Collaborators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collabs: [],
      repoName: '',
      currentUser: '',
    };
  }
  componentDidMount() {
    this.props.fetchCollaborators(this.props.currentUser, this.props.repoName, this.props.git_token);
  }
  componentWillReceiveProps(nextProps) {
    const { collabs, repoName, currentUser, fork } = nextProps;

    if (collabs.length !== 0) {
      const currentState = this.state;
      this.setState({ ...currentState, collabs, repoName, currentUser });
    }
    if (repoName) {
        if (repoName !== this.props.repoName || fork !== this.props.fork) {
        this.props.fetchCollaborators(currentUser, repoName, this.props.git_token);
      }
    }
  }
  render() {
    return (
      <div>
        <Chip collabs={this.state.collabs} />
      </div>
    );
  }
}

export default connect((state, ownProps) => ({
  collabs: state.collabs.collabs,
  git_profile: state.auth.git_profile,
  git_token: state.auth.github_token,
}), (dispatch) => ({
  fetchCollaborators: (userId, repoName, token) => dispatch(fetchCollaborators(userId, repoName, token)),
}))(Collaborators);
