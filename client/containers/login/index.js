import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm';
import styles from '../../components/LoginForm/LoginForm.css';
import PropTypes from 'prop-types';
import { logUserIn } from '../../actions/loginActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { history, successUserLogin } = nextProps;
    if (successUserLogin) {
      history.replace('/dashboard');
    }
  }
  handleChange = (value, prop) => {
    this.setState({ [prop]: value });
  };
  handleLogin = () => {
    const { email, password } = this.state;
    this.props.logUserIn(email, password);
  }
  render() {
    const { email, password } = this.state;
    return (

      <div className={`${styles.backFix}`}>
        <div className={`col-xs-12 ${styles.imageBackground}`}>
          <img className={styles.logo} src="./images/utile.gif" alt="our logo" />
        </div>
        <div className="row">
          <div className={`col-lg-6 col-md-6 col-sm-6 col-xs-12 ${styles.formFix}`}>

            <LoginForm
              email={email}
              password={password}
              handleChange={this.handleChange}
              handleLogin={this.handleLogin}
            />
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  logUserIn: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  successUserLogin: PropTypes.bool,
};
Login.defaultProps = {
  successUserLogin: false,
};
export default connect((state, ownProps) => ({
  loggingUserIn: state.login.loggingUserIn,
  successUserLogin: state.login.loggedInUser,
}), (dispatch) => ({
  logUserIn: (email, password) => dispatch(logUserIn(email, password)),
}))(Login);
