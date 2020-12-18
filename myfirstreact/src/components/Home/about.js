import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
class About extends Component {
    constructor(props) {
        super(props);

    }

    

    render() {
        const user = localStorage.getItem('user');
        return (
            <div className="App">
           <div><br/><br/><br/><br/><br/></div>
        <ul>
        <Link to='/blogs'><li >Home</li></Link>
        <Link to={'/profile/'+ user}><li>My Profile</li></Link>
        <Link to='/post'><li >Add Blog</li></Link>
        <Link to='/profile'><li>BlogBook Users</li></Link>
        <Link to="/developer"><li className='active'>About</li></Link>
        <Link to='/'><li style ={{float: 'right'}} onClick = {this.handleLogout}>Logout</li></Link>
       
      </ul>
           <br/> 
            <div className="heading">
                <h1 className="myposts" >About BlogBook</h1> 
            </div></div>
        );
    }
}

export default About;