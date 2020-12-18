import './style.css';
import React, {Component} from 'react';
import Cookie from "js-cookie";
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";

class Signin extends React.Component {

  constructor() {
    super();

    this.state = {
      userid:'',
      password:'',
      token:''
      };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    
    //alert("Login Successful!")
   
    console.log(this.state)

    const data = { UserId:this.state.userid,Password:this.state.password }
    axios.post('http://localhost:4000/login', data)

    .then(res => { 
      console.log(res.data);
      if(res.data.success)
      console.log(res.data);
      localStorage.setItem('token', res.data.accessToken);
      localStorage.setItem('user', res.data.UserId);
      this.props.history.push('/blogs');
    })

    .catch(error => console.error('Error:', error));
      
   
   }

  render() {
      const {userid,password} = this.state
    return (
        <div className="App">
           
        <div className="new"> <b>Welcome to BlogBook </b><br/><br/></div>

        <form className='form' onSubmit={this.handleSubmit} method="user" >
        <h1>Login</h1>
        <p>Enter your credentials.</p>
        <hr/>
         <label>
         <span><b>UserId:</b>&emsp;&emsp;</span>
         <input type="text" name="userid" value={userid} placeholder="Enter UserId" onChange={this.handleChange} required/><br />
         </label>
         <label>
         <span><b>Passsword:</b>&nbsp;</span>
         <input type="password" name="password" placeholder="Enter Password" value={password} onChange={this.handleChange} required/><br />
         </label>
         <button type="submit" className="loginbtn">LogIn</button>
         <p>New to BlogBook? <a href="#"><b> <Link to="/register">Register</Link></b></a>.</p>

       </form><br/><br/>
      
     </div>
    );
  }
}

export default Signin;
