
/*  eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-toolbox/lib/button';
import EventFeed from '../../components/EventFeed';
import Chat from '../chat';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'Fuck yea!!!',
      active: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  componentDidMount() {
    axios.get('/test')
      .then((result) => {
        console.info('What is our response', result);
        this.setState({ data: result.data.Hello });
      }).catch((err) => {
        console.info('Error Huston!', err);
      });
  }
  handleToggle() {
    this.setState({ active: !this.state.active });
  }
  render() {
    return (
      <div
        className="container-fluid"
        style={{ backgroundColor: 'red' }}
      >
        <div className='col-lg-6'>
          <EventFeed />
        </div>
        <div className='col-lg-6'>
          <Chat/>
      </div>
      </div>
    );
  }
}

// function mapStateToProps(state, ownProps) {
//   return {};
// }
//
// function bindActions(dispatch) {
//   return {};
// }
export default Dashboard;
