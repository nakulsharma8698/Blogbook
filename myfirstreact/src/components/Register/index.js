import './style.css';
import React, {Component} from 'react';
import { Link } from "react-router-dom";

class Register extends React.Component {

  constructor() {
    super();

    this.state = {
      name: '',
      userid:'',
      phone :'',
      password:'',


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
    alert("Registered Successfully!")
    this.props.history.push('/');
    event.preventDefault();
    console.log(this.state)

    const data = { Name:this.state.name, UserId:this.state.userid ,Phone:this.state.phone ,Password:this.state.password }
    
    fetch('http://localhost:4000/create', { method: 'POST', 

    body: JSON.stringify(data), 

    headers:{ 'Content-Type': 'application/json' } })

    .then(res => res.json())

    .catch(error => console.error('Error:', error))

    .then(response => console.log('Success:', response));
   }



  render() {
      const {name, email, phone, password} = this.state
    return (
        <div className="App">
           <div class="container signin">
    <p><b>Already have an account? </b></p>

    <Link to="/"><button type="submit" class="submitbtn">LogIn</button></Link>
  </div>
        <div className="new"> <b>New To BlogBook? Create an Account </b><br/><br/></div>

        <form className='form' onSubmit={this.handleSubmit} method="user" className="right">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr/>
         <label>
         <span><b>Name:</b>&emsp;&emsp;</span>
         <input type="text" name="name" value={name} placeholder="Enter your Name" onChange={this.handleChange} required/><br />
         </label>
         <label>
         <span><b>UserId:</b>&emsp;&emsp;</span>
         <input type="text" name="userid"  value={email} placeholder="Enter User Id"onChange={this.handleChange} required/><br />
         </label>
         <label>
         <span><b>Phone:</b>&emsp;&ensp;&nbsp;</span>
         <input type="text" name="phone" value={phone} placeholder="Enter your number"onChange={this.handleChange} required/><br />
         </label>
         <label>
         <span><b>Passsword:</b>&nbsp;</span>
         <input type="password" name="password" placeholder="Enter Password" value={password} onChange={this.handleChange} required/><br />
         </label>
        <button type="submit"  className="registerbtn">Register</button>
         <p>By creating an account you agree to our <a href="#"><b>Terms & Privacy</b></a>.</p>

       </form><br/><br/>
      
     </div>
    );
  }
}

export default Register;
