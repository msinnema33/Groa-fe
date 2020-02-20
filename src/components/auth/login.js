import React from 'react';
import { connect } from 'react-redux';
import {loginAction} from '../../store/actions/loginAction';
import { render } from 'node-sass';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        //reset Login
        this.props.logout();

        this.state = {
            username: '',
            password: '',
        };
    }

handleChange = e => {
    e.target.value
}

loginUser = e => {
    e.preventDefault();
    console.log(user)
      axiosWithAuth()
      .post("/api/login", user)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        console.log(res.data.payload)
        // redirect to Groas dashboard page
        props.history.push('/');
      })
      .catch(err => console.log(err));
      console.log('Login error post')
  };
  

  render() {

  return (
    <div  className='LoginForm'>
      <h1>Groa Login</h1>
    
      <form onSubmit={loginUser}>
        <input className='input'
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Username"
          value={user.username}
        />

        <input className='input'
          type="text"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          value={user.password}
        />

        <button>Log in</button>
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
