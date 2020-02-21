import React from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth'

import { connect } from 'react-redux';
import {loginAction} from '../../store/actions/loginAction';
import './login.scss';



class LoginPage extends React.Component {
    // constructor(props) {
    //     super(props);

        //reset Login
        //this.props.logout();

        // this.state = {
        //     username: '',
        //     password: '',
        // };

        state = {
          credentials: {
            username: '',
            password: '',
          }
      }

    //}
  
    handleChange = e => {
      this.setState({
          credentials: {
          ...this.state.credentials,
          [e.target.name]: e.target.value
          }
      });
  
  };


  
loginUser = e => {
    e.preventDefault();
    //console.log(user)
      axiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        console.log(res.data.payload)
        // redirect to Groas dashboard page
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
      console.log('Login error post')
  };
  

  render() {

  return (
    <div  className='LoginForm'>
        <div className='sentence'>
        <h1>Your movies, your way.</h1>
        </div>
     
    
      <form onSubmit={this.loginUser}>
        <input className='input'
          type="text"
          name="username"
          onChange={this.handleChange}
          placeholder="Username"
          value={this.username}
        />

        <input className='input'
          type="text"
          name="password"
          onChange={this.handleChange}
          placeholder="Password"
          value={this.password}
        />

        <button className='btnLogin'>Log in</button>
      </form>
    </div> 
   )
 };
}

const mapStateToProps = state => {
    return {
        userData: state.userData,
        isFetching: state.isFetching,
        error: state.error
    };
};

export default connect(
    mapStateToProps,
    {loginAction}
)(LoginPage);
