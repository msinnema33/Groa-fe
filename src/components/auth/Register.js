import React from "react";
import { connect } from "react-redux";
import { registerAction, loginAction } from "../../store/actions";
import { ifDev } from "../../utils/removeAttribute.js";
import {Link} from "react-router-dom";

// styling imports
import Picture3 from "../../img/couch-popcorn.png";

// Navbar Register
import RegisterNavLinks from "../layout/nav-layouts/RegisterNavLinks";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        user_name: "",
        password: "",
        confirmpassword: ""
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = {
      user_name: this.state.user.user_name,
      password: this.state.user.password,
      email: this.state.user.email
    };
    this.setState({ submitted: true });
    if (
      this.state.user.email &&
      this.state.user.user_name.length >= 6 &&
      this.state.user.password.length >= 6 &&
      this.state.user.confirmpassword === this.state.user.password
    ) {
      this.props.registerAction(user, this.props.history);
    }
  }

  render() {
    const { user, submitted } = this.state;
    return (
      <div
        className="container register-component"
        data-test={ifDev("register-component")}
      >
        <div className="onboarding-nav registerNav">
          <RegisterNavLinks />
        </div>
        <div className="boxHolder box-container">
          <div className="box-left">
            <div className="text-container">
              <h1>Your movies, <br/> your way.</h1>
              <h5> Groa helps you pick the perfect film... so you <br/> can save your popcorn for the good stuff.</h5>
            </div>
            <div className="image-wrapper">
              <img className="logo" src={Picture3} alt="Graphic" />
            </div>
          </div>

          <div className="box-right">
            <form
              className="form register-form"
              data-test={ifDev("registerForm")}
              onSubmit={this.handleSubmit}
            >
              {/* divs with changing classnames updates error handling for form */}
              <div
                className={
                  "forms" + (submitted && !user.email ? " has-error" : "")
                }
              >
                <h3>Email</h3>
              </div>
              <input
                className="form-control"
                type="email"
                name="email"
                value={user.email}
                onChange={this.handleChange}
                placeholder="Enter your email"
              />
              {submitted && !user.email && (
                <div className="callingError">Email is required</div>
              )}

              <div
                className={
                  "forms" + (submitted && !user.user_name ? " has-error" : "")
                }
              >
                <h3>Username </h3>
              </div>
              <input
                className="form-control"
                type="text"
                name="user_name"
                value={user.user_name}
                onChange={this.handleChange}
                placeholder="Enter your username"
              />
              {submitted && !user.user_name && (
                <div className="callingError">Username is required</div>
              )}

              {submitted && user.user_name.length < 6 && (
                <div className="callingError">
                  Username is required to be 6 characters or more{" "}
                </div>
              )}

              {this.props.errorStatus && user.user_name && (
                <div className="callingError">Username is already in use</div>
              )}

              <div
                className={
                  "forms" + (submitted && !user.password ? " has-error" : "")
                }
              >
                <h3>Password</h3>
              </div>

              <input
                className="form-control"
                type="password"
                name="password"
                value={user.password}
                onChange={this.handleChange}
                placeholder=" Enter your password"
              />
              {submitted && !user.password && (
                <div className="callingError">Password is required</div>
              )}
              {submitted && user.password.length < 6 && (
                <div className="callingError">
                  Password is required to be 6 characters or more{" "}
                </div>
              )}

              <div
                className={
                  "forms" +
                  (submitted && !user.confirmpassword ? " has-error" : "")
                }
              >
                <h3>Confirm Password</h3>
              </div>
              <input
                className="confirmPass form-control"
                type="password"
                name="confirmpassword"
                value={user.confirmpassword}
                onChange={this.handleChange}
                placeholder="Enter your password again"
              />
              {submitted && user.confirmpassword !== user.password && (
                <div className="callingError">Passwords do not match</div>
              )}
              <div className="bottom-form">
                {/* todo: add Remember functionality */}
                <div className="check-box-container">
                  <input type="checkbox" />
                  <p>Remember me </p>
                </div>
                <div className="signup-btn-container btn-container">
                  <button className="signup-btn">Sign Up </button>
                </div>
                </div>
                <div className="bottomAccount">
                  <Link className="loginAccount"
                    onClick={this.handleSubmit}
                    data-test={ifDev("loginBtn")}
                    to="/login">
                    Already have an account? 
                  </Link>
                </div>
            </form>
          </div>
          {/* end box right */}
        </div>
        {/* END boxHolder */}
      </div>
      //END CONTAINER
    );
  }
}

const mapStateToProps = state => {
  return {
    registerSuccess: state.register.success,
    userid: state.login.userid,
    errorStatus: state.register.error
  };
};
export default connect(mapStateToProps, { registerAction, loginAction })(
  Register
);
