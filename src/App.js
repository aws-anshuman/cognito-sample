import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Amplify from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import aws_exports from "./aws-exports";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
Amplify.configure(aws_exports);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSignedUp: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const { userSignedUp } = this.state;
    this.setState({
      userSignedUp: !userSignedUp,
    });
  }

  render() {
    const styles = {
      color: "blue",
    };

    const { userSignedUp } = this.state;
    return (
      <div>
        <button style={styles} onClick={this.handleToggle}>
          toggle
        </button>
        <br></br>

        {!userSignedUp ? <SignUpForm /> : <SignInForm />}
      </div>
    );
  }
}

export default App;
