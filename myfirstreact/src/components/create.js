
import React, {Component} from 'react';

class Create extends React.Component {

  constructor() {
    super();

    this.state = {
      name: '',
      email:'',
      phone :'',
      city:'',
      password:'',


      };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
     /* [e.target.email]: e.target.value,
      [e.target.phone]: e.target.value,
      [e.target.city]: e.target.value,
      [e.target.password]: e.target.value*/
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state)

    const data = { Name:this.state.name, Email:this.state.email ,Phone:this.state.phone ,City:this.state.city , Password:this.state.password }
    
    //axios.post('http://localhost:4000/create', data)
    //.then(res => console.log(res.data));

    //const {name, email, phone, city, password} = this.state
    fetch('http://localhost:4000/create', { method: 'POST', 

    body: JSON.stringify(data), // data can be `string` or {object}!

    headers:{ 'Content-Type': 'application/json' } })

    .then(res => res.json())

    .catch(error => console.error('Error:', error))

    .then(response => console.log('Success:', response));
   }



  render() {
      const {name, email, phone, city, password} = this.state
    return (
        <div className="App">
        <form onSubmit={this.handleSubmit} method="user" className="right">
         <label>
         <span>name:</span><br />
         <input type="text" name="name" value={name} onChange={this.handleChange}/><br /><br />
         </label>
        
         <label>
         <span>email:</span><br />
         <input type="email" name="email"  value={email} onChange={this.handleChange}/><br />
         </label>
         <label>
         <span>phone:</span><br />
         <input type="text" name="phone" value={phone} onChange={this.handleChange}/><br />
         </label>
         <label>
         <span>City:</span><br />
         <input type="text" name="city" value={city} onChange={this.handleChange} /><br />
         </label>
         <label>
         <span>Passsword:</span><br />
         <input type="password" name="password"  value={password} onChange={this.handleChange} /><br /><br />
         </label>
         <input type="submit" value="submit" />
       </form>
     </div>
    );
  }
}

export default Create;