import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';

const emptyState = {
  username: '',
  usernamePristine: true,
  usernameError: 'Username is required',

  email: '',
  emailPristine: true,
  emailError: 'Email is required',

  password: '',
  passwordPristine: true,
  passwordError: 'Password is required',
};

const MIN_NAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 8;

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
  }

  handleValidation = (name, value) => {
    switch (name) {
      case 'username':
        if (value.length < MIN_NAME_LENGTH) {
          return `Your username must be at least ${MIN_NAME_LENGTH} characters`;
        }
        return null;
      case 'email':
        if (!validator.isEmail(value)) {
          return 'You must provide a valid email';
        }
      case 'password':
        if (value.length < MIN_PASSWORD_LENGTH) {
          return `Your password must be at least ${MIN_PASSWORD_LENGTH} characters`;
        }
        return null;
      default:
        return null;
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      [`${name}Pristine`]: false,
      [`${name}Error`]: this.handleValidation(name, value),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { usernameError, emailError, passwordError } = this.state;

    if (this.props.type === 'login' || (!usernameError && !passwordError && !emailError)) {
      this.props.onComplete(this.state);
      this.setState(emptyState);
    }
    this.setState({
      usernamePristine: false,
      passwordPristine: false,
      emailPristine: false,
    })
  };

  render() {
    let { type } = this.props;
    type = type === 'login' ? 'login' : 'signup';

    const signupJSX =
        <div>
          <input
            name='email'
            placeholder='email'
            type='email'
            value={this.state.email}
            onChange={this.handleChange}
          />
          { this.state.emailPristine ? undefined : <p>{ this.state.emailError }</p> }
        </div>;
    return(
        <form onSubmit={this.handleSubmit}>
          <input
            name='username'
            placeholder='username'
            type='text'
            value={this.state.username}
            onChange={this.handleChange}
          />
          { this.state.usernamePristine ? undefined : <p>{ this.state.usernameError }</p> }
          { type !== 'login' ? signupJSX : undefined }
          <input
              name='password'
              placeholder='password'
              type='password'
              value={this.state.password}
              onChange={this.handleChange}
          />
          { this.state.passwordPristine ? undefined : <p>{ this.state.passwordError }</p> }
          <button type='submit'>{ type }</button>
        </form>
    );
  }
};

AuthForm.propTypes = {
  onComplete: PropTypes.func,
};

export default AuthForm;
