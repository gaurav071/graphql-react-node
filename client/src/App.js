import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Nav from "./components/Nav";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import CompleteRegistration from "./pages/auth/CompleteRegistration";
import { AuthContext } from "./context/authContext";
import PrivateRoute from "./components/PrivateRoute";
import PasswordUpdate from "./pages/auth/PasswordUpdate";
import PasswordForgot from "./pages/auth/PasswordForgot";
import Profile from "./pages/auth/Profile";
import Post from "./pages/post/Post";

const App = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    request: (operation) => {
      operation.setContext({
        headers: {
          authtoken: user ? user.token : "",
        },
      });
    },
  });

  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/password/forgot" component={PasswordForgot} />
        <Route
          exact
          path="/complete-registration"
          component={CompleteRegistration}
        />
        <PrivateRoute
          exact
          path="/password/update"
          component={PasswordUpdate}
        />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/post/create" component={Post} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
