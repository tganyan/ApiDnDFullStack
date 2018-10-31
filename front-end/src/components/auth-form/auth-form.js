import React from 'react';
import PropTypes from 'prop-types';

const emptyState = {
  username: '',
  email: '',
  password: '',
}

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  };

  render() {
    let { type } = this.props;
    type = type === 'login' ? 'login' : 'signup';

    const signupJSX =
        <input
          name='email'
          placeholder='email'
          type='email'
          value={this.state.email}
          onChange={this.handleChange}
        />;
    return(
        <form onSubmit={this.handleSubmit}>
          <input
            name='username'
            placeholder='username'
            type='text'
            value={this.state.username}
            onChange={this.handleChange}
          />
          { type !== 'login' ? signupJSX : undefined }
          <input
              name='password'
              placeholder='password'
              type='password'
              value={this.state.password}
              onChange={this.handleChange}
          />
          <button type='submit'>{ type }</button>
        </form>
    );
  }
};

AuthForm.propTypes = {
  onComplete: PropTypes.func,
};

export default AuthForm;
