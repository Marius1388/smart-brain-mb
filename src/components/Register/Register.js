import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      pet:'',
      age:''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onAgeChange = (event) => {
    this.setState({age: event.target.value})
  }

  onPetChange = (event) => {
    this.setState({pet: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  onSubmitRegister = () => {
    fetch('http://localhost:3000/register', {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        pet: this.state.pet,
        age: this.state.age
      })
    })
      .then(response => response.json())
      .then(data => {
         
        if (data.userId && data.success === "true") {
          // console.log("checking data "+data.userId);
          this.saveAuthTokenInSession(data.token);
          fetch(`http://localhost:3000/profile/${data.userId}`, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              'Authorization': data.token
            }
          })
            .then(resp => resp.json())
            .then(user => {
                // console.log("the second log"+user.id)
              if (user.id ) {
               this.props.loadUser(user);
              //  console.log("the user registered is "+user.id);
               this.props.onRouteChange("home");
              }
            });
        }
        else {
          this.props.onRouteChange("home");
         }
      });
      // .catch(console.log)
  };

  saveAuthTokenInSession = token => {
    window.localStorage.setItem("token", token);
  };


  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="age">Age</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="age"
                  id="age"
                  onChange={this.onAgeChange}
                />
              </div> 
             <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="pet">Pet</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="pet"
                  id="pet"
                  onChange={this.onPetChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;