
import React, {Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class Post extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null
      }
   
  }
  onClickHandler = (event) => {
    event.preventDefault();
    const data = new FormData() 
    data.append('image', this.state.selectedFile);
    data.append("name", this.state.name);
    data.append("desc", this.state.desc);
   //const token = localStorage.getItem('token');
   //data.append("token",token);
    axios.post("http://localhost:4000/upload", data, { 
      })
      .then(res => { 
        console.log(res.data);
        if(res.data){
          console.log(res.data);
          alert("Blog Added Successfully");
          this.props.history.push('/blogs');
      }

          else
            alert("Failed to Upload");
      })
}
handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}
  onChangeHandler=event=>{
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
    //console.log(event.target.files[0])

}

 
  render(){
    const user = localStorage.getItem('user');
    return (
        <div className="App">
           <div><br/><br/><br/><br/><br/></div>
        <ul>
        <Link to='/blogs'><li >Home</li></Link>
        <Link to={'/profile/'+ user}><li>My Profile</li></Link>
        <Link to='/post'><li className='active'>Add Blog</li></Link>
        <Link to='/profile'><li>BlogBook Users</li></Link>
        <Link to="/developer"><li>About</li></Link>
        <Link to='/'><li style ={{float: 'right'}} onClick = {this.handleLogout}>Logout</li></Link>
       
      </ul>
           <br/> 
          <form>
           <br/>
          <label><b>Heading: </b></label><br/>
          <input type="text" name="name" onChange={this.handleChange}/><br />
          <label><b>Description: </b></label><br/>
          <textarea type="text" name="desc" onChange={this.handleChange}/><br />
          <label><b>Select File: </b></label><br/>
          <input type="file" name="image" onChange={this.onChangeHandler}/><br />
          <button type="submit" className="registerbtn" onClick={this.onClickHandler}>Upload</button> 
          </form>
     </div>
    );
  }
}

export default Post;
