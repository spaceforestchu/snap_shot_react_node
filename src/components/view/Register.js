import React, {Component} from 'react';

class Register extends Component {

  constructor(){
    super();

    this.state = {
      registration: {
        username: '',
        password: ''
      }
    }
  }

  updateRegistration(event) {
    let updated = Object.assign({}, this.state.registration);
    updated[event.target.id] = event.target.value;

    this.setState({
      registration: updated
    });

  }

  submitRegistration(event) {
    event.preventDefault();

    if (this.state.registration.username.length === 0) {
      alert('Please enter a username');
      return;
    }

    if (this.state.registration.password.length === 0) {
      alert('Please enter a password');
      return;
    }



    this.props.onRegister(this.state.registration);
  }

  submmitLoginCredentials(event) {
    event.preventDefault();

    if (this.state.registration.username.length === 0) {
      alert('Please enter a username');
      return;
    }

    if (this.state.registration.password.length === 0) {
      alert('Please enter a password');
      return;
    }

    this.props.onLogin(this.state.registration);
  }

  render() {
    return (

      <div>
        <h2>Sign up</h2>
        <input  onChange={this.updateRegistration.bind(this)} id='username' type='text' placeholder='Username'/><br/>
        <input  onChange={this.updateRegistration.bind(this)} id='password' type='password' placeholder='Password'/><br/>
        <button className='button special small' onClick={this.submitRegistration.bind(this)}>Join</button>

        <button className='button special small' onClick={this.submmitLoginCredentials.bind(this)}>Sign In</button>

      </div>

    )
  }
}

export default Register;
