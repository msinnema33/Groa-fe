import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { ifDev } from "./utils/removeAttribute.js";

// local imports
import PrivateRoute from "./utils/privateRoute.js";
import Dashboardv1 from "./components/dashboard/dashboardv1.js";

import Navigation from "./components/dashboard/navigation.js";
import Register from "./components/auth/Register";
import Login from "./components/auth/login";

// config imports
import reactGAinitialization from "./config/analytics.js";

// creating the store
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { reducer } from "./store/reducers";
import { BrowserRouter as Router } from "react-router-dom";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userid, setUserid] = useState();
  useEffect(() => reactGAinitialization(), [userid]);

  return (
    <Provider store={store}>
      <Router>
        <div className="App" data-test={ifDev("App-component")}>
          <Route
            path="/login"
            render={props => (
              <Login
                {...props}
                token={token}
                updateToken={setToken}
                updateUserid={setUserid}
              />
            )}
          />
          <Route
            exact
            path="/register"
            render={props => (
              <Register
                {...props}
                token={token}
                updateToken={setToken}
                updateUserid={setUserid}
              />
            )}
          />
          {/* this is fine as a route because all of the routes that will have display their component will only be avalible on a private route */}
          <Route
            exact
            path={[
              "/:userid/recommended",
              "/:userid/trending",
              "/:userid/watchlist",
              "/:userid/explore"
            ]}
            render={props => <Navigation {...props} userid={userid} />}
          />
          <PrivateRoute
            exact
            path="/:userid/recommended"
            component={Dashboardv1}
            data-test={ifDev("dash-component")}
          />
          <Route
            exact
            path="/"
            render={props =>
              token ? (
                <>
                  <Navigation {...props} userid={userid} />
                  <Dashboardv1 />
                </>
              ) : (
                // Register for presentation
                <Register
                  {...props}
                  token={token}
                  updateToken={setToken}
                  updateUserid={setUserid}
                />
              )
            }
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
