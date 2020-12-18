import React from 'react';
import axios from 'axios';
class Registraion extends React.Component {
 constructor(props) {
  super(props)
         this.state = {
          persons: [],
          users: []
        }
        //this.handleIdChange = this.handleIdChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        //this.handleAgeChange = this.handleAgeChange.bind(this);
        //this.handleCityChange = this.handleCityChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
       
      }
  //handleIdChange(e) {
    //this.setState({id: e.target.value})
  //}
  handleNameChange(e) {
    this.setState({name: e.target.value})
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }
  handlePhoneChange(e) {
    this.setState({phone: e.target.value})
  }
  handleCityChange(e) {
    this.setState({city: e.target.value})
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }
 
  componentDidMount() {
    axios.get(`http://localhost:3000`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }  
 
  onSubmit(e) {
      e.preventDefault();
      const employee = {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        city: this.state.city,
        password: this.state.password,

      }
      
      axios.post('http://localhost:3000', employee)
      .then(res => {
          const persons = res.data;
          this.setState({ persons });
        })         
    
  }  
  render() {
    return (
    <div className="App">
       <form onSubmit={this.onSubmit} method="user" className="right">
        <label>
        <span>name:</span><br />
        <input type="text" name="name" onChange={this.handleNameChange}/><br /><br />
        </label>
       
        <label>
        <span>email:</span><br />
        <input type="email" name="email" onChange={this.handleEmailChange}/><br />
        </label>
        <label>
        <span>phone:</span><br />
        <input type="text" name="phone" onChange={this.handlePhoneChange}/><br />
        </label>
        <label>
        <span>City:</span><br />
        <input type="text" name="city"onChange={this.handleCityChange} /><br />
        </label>
        <label>
        <span>Passsword:</span><br />
        <input type="password" name="password" onChange={this.handlePasswordChange} /><br /><br />
        </label>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
  }
}
export default Registraion;