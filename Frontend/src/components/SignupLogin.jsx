import axios from "axios";
import { useState } from "react";

const SignupLogin = ({ onSubmit, error }) => {
  const [isActive, setIsActive] = useState(false);
  const [loginInfo, setloginInfo] = useState({
    email: '',
    password: ''
  })

  const [signupInfo, setsignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleLoginChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    const copyLoginInfo = {...loginInfo};
    copyLoginInfo[name] = value
    setloginInfo(copyLoginInfo)
    console.log("loginInfo -> ", loginInfo)
  }

  const handleSignupChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    const copySignupInfo = {...signupInfo};
    copySignupInfo[name] = value
    setsignupInfo(copySignupInfo)
    console.log("signupInfo -> ", signupInfo)
  }

  const handleSignup = async(e) => {
    e.preventDefault();
    const {name, email, password} = signupInfo;
    if(!name || !email || !password){
         alert("Field is missing");
         return;
    }
    try{
      const response = await axios.post("http://localhost:4000/auth/signup", {
        name,
        email,
        password
      })
      console.log(response)
    } catch(err){
      console.log(err)
      // alert("Field is missing");
    }
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    const { email, password} = loginInfo;
    if(!email || !password){
         alert("Field is missing");
         return;
    }
    try{
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password
      })
      console.log(response)
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div className={`container ${isActive ? "right-panel-active" : ""}`}>

      <div className="form-container sign-up-container">
        <form onSubmit={handleSignup}>
          <h1>Create Account</h1>
          
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f" /></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g" /></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in" /></a>
          </div>

          <span>or use your email for registration</span>

          <input onChange={handleSignupChange} type="text" placeholder="Name" id="name" name="name" />
          <input onChange={handleSignupChange} type="email" placeholder="Email" id="email" name="email"/>
          <input onChange={handleSignupChange} type="password" placeholder="Password" id="password" name="password" />

          <button type="submit">Sign Up</button>

          <p className="message" id="message"></p>
        </form>
      </div>

      {/* SIGN IN */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1>Sign in</h1>

          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f" /></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g" /></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in" /></a>
          </div>

          <span>or use your account</span>

          <input type="email" placeholder="Email" onChange={handleLoginChange} name="email" />
          <input type="password" placeholder="Password" onChange={handleLoginChange} name="password" />

          <a href="#">Forgot your password?</a>

          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* OVERLAY */}
      <div className="overlay-container">
        <div className="overlay">

          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={() => setIsActive(false)}>
              Sign In
            </button>
          </div>

          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" type="submit" onClick={() => setIsActive(true)}>
              Sign Up
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SignupLogin;