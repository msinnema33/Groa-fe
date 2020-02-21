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
    <div className='LoginPage'>
    
      <form className='LoginForm' onSubmit={this.loginUser}>
      <h1 className='textlogin'>Log in</h1>
        <input className='input1'
          type="text"
          name="username"
          onChange={this.handleChange}
          placeholder="Username"
          value={this.username}
        />

        <input className='input1'
          type="text"
          name="password"
          onChange={this.handleChange}
          placeholder="Password"
          value={this.password}
        />
        
        <h6 className='textOr'>or</h6>

        {/* USER NAME */}
        <input className='input2'
          type="text"
          name="username"
          onChange={this.handleChange}
          placeholder="Username"
          value={this.username}
        />
        {/* PASSWORD */}
        <input className='input2'
          type="text"
          name="password"
          onChange={this.handleChange}
          placeholder="Password"
          value={this.password}
        /> 
        <div className='Bottom'>

        <div className='textBot'>
          <h4>Remember me</h4>
          <h4>Forgot password?</h4>
        </div> 
        

        <button className='BtnLogin'>Log in</button>
        </div> 
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
