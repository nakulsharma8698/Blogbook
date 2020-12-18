
import React, {Component} from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import './style.css';

const Todo = props => (
  <div> <div  className="blogs"><b>{props.todo.UserId}</b></div>
  <div  className="singlepost" >
    <br/>
    <div className= "heading"><b>{props.todo.name}</b></div><hr/>
      <img src={props.todo.img}  className="postimg"/><hr/>
      <p className="read">{props.todo.desc}</p><br />
  </div><br/></div>
)
class Blogs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: []
            
    };
  }

componentDidMount(){
  const token = localStorage.getItem('token');
if(token){
  axios.get('http://localhost:4000/upload/', { headers: {"Authorization" : `Bearer ${token}`}})
  .then(res => {
      this.setState({ post: res.data });
  })
  .catch(function (error){
      console.log(error);
  })
}

}
handleLogout()
{
  localStorage.removeItem("token");
}
handleUser()
{
  const user =localStorage.getItem('user');
  this.props.history.push("/profile/"+ {user})
}
// user =localStorage.getItem('user');
todoList() {
  return this.state.post.map(function(curr, i){
      return <Todo todo={curr} key={i} />;
  })
}
  render() { 
    const user = localStorage.getItem('user');
    return (
      <div>
        <div><br/><br/><br/><br/><br/></div>
        <ul>
        <Link to='/blogs'><li className='active'>Home</li></Link>
       {/*<li onClick={this.handleUser}>My Profile</li>*/}
       <Link to={'/profile/'+user}><li >My Profile</li></Link>
        <Link to='/post'><li>Add Blog</li></Link>
        <Link to='/profile'><li>BlogBook Users</li></Link>
        <Link to="/developer"><li>About</li></Link>
        <Link to='/'><li style ={{float: 'right'}} onClick = {this.handleLogout}>Logout</li></Link>
       
      </ul>
         
        <br />  <br />
        <div className="post">
         
                    <div >
                    
                    { this.todoList() }
                    </div>
                   <br/>
        </div>
       
        </div>
    );
  }
}

export default Blogs;