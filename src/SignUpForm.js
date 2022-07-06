import React, { Component } from "react";
import { Auth } from "aws-amplify";

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      phone_number: "",
      email: "",
      confirmationCode: "",
      signedUp: false,
      signUpConfirmed: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      signedUp,
      username,
      password,
      email,
      phone_number,
      confirmationCode,
      signUpConfirmed,
    } = this.state;
    if (!signedUp) {
      Auth.signUp({
        username: username,
        password: password,
        attributes: {
          email: email,
          phone_number: phone_number,
        },
      })
        .then(() => console.log("Signed up"))
        .catch((err) => console.log(err));

      this.setState({
        signedUp: true,
      });
    } else {
      Auth.confirmSignUp(username, confirmationCode)
        .then(() => console.log("confirmed sign up"))
        .catch((err) => console.log(err));
      this.setState({
        signUpConfirmed: true,
      });
    }
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
    const { signedUp } = this.state;
    const { signUpConfirmed } = this.state;
    if (signUpConfirmed) {
      return <h1>User is confirmed. User can signIn now.</h1>;
    }
    if (signedUp) {
      return (
        <form onSubmit={this.handleSubmit}>
          <label style={styles}>Username: </label>
          <input name="username" type="text" onChange={this.handleChange} />
          <br />
          <label style={styles}>Confirmationcode: </label>
          <input
            name="confirmationCode"
            type="text"
            onChange={this.handleChange}
          />
          <br />
          <button style={styles}>Confirm</button>
        </form>
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <label style={styles}>Username: </label>
          <input name="username" type="text" onChange={this.handleChange} />
          <br />
          <br />
          <label style={styles}>Password: </label>
          <input name="password" type="password" onChange={this.handleChange} />
          <br />
          <br />
          <label style={styles}>PhoneNo: </label>
          <input name="phone_number" type="text" onChange={this.handleChange} />
          <br />
          <br />
          <label style={styles}>Email: </label>
          <input name="email" type="text" onChange={this.handleChange} />
          <br />
          <br />
          <button style={styles}>Sign up</button>
          <br />
          <br />
        </form>
      );
    }
  }
}

export default SignUpForm;
