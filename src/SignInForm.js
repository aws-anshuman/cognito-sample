import React, { Component } from "react";
import { Auth } from "aws-amplify";

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      signedIn: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { signedIn, username, password } = this.state;

    Auth.signIn({
      username: username,
      password: password,
    })
      .then(() => console.log("Signed in"))
      .catch((err) => console.log(err));

    // Auth.confirmSignIn(username)
    //   .then(() => console.log("confirmed sign in"))
    //   .catch((err) => console.log(err));

    this.setState({
      signedIn: true,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const styles = {
      color: "blue",
    };
    const { signedIn } = this.state;
    if (signedIn) {
      return <h1 style={styles}>You have signed in!!</h1>;
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label style={styles}>Username: </label>
            <input name="username" type="text" onChange={this.handleChange} />
            <br />
            <br />
            <label style={styles}>Password: </label>
            <input
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <button style={styles}>Sign In</button>
          </form>
        </div>
      );
    }
  }
}

export default SignInForm;
