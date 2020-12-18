
import React, {Component} from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
const Todo = props => (
  <div> 
  <div  className="singlepostt">
    <br/>
      <tr>
       
        <td><div className= "dp">&nbsp;&nbsp;<img src={props.todo.dp}  className="postimggg"/>&nbsp;&nbsp;</div></td>
        <td><div className= "userid"><b >&emsp;&emsp;{props.todo.UserId}</b><br /></div>
        <tr> <h2 className= "name"><b>&nbsp;&emsp;{props.todo.Name}</b>&nbsp;&nbsp;</h2></tr>
        
        </td>
        <td><Link to={'/profile/' + props.todo.UserId}><tr float ="right"><b>View Profile</b></tr></Link></td>
      </tr>
  </div><br/></div>
  
)
class Profiles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: []
            
    };
  }

componentDidMount(){
  const token =localStorage.getItem('token');
if(token){
  axios.get('http://localhost:4000/profile/' , { headers: {"Authorization" : `Bearer ${token}`}})
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
        <Link to='/blogs'><li >Home</li></Link>
        <Link to={'/profile/'+ user}><li  >My Profile</li></Link>
        <Link to='/post'><li>Add Blog</li></Link>
        <Link to='/profile'><li className='active'>BlogBook Users</li></Link>
        <Link to="/developer"><li>About</li></Link>
        <Link to='/'><li style ={{float: 'right'}} onClick = {this.handleLogout}>Logout</li></Link>
       
      </ul>
         
        <br />  <br />
        <div>
         
                    <div className="post">
                    
                    { this.todoList() }
                    </div>
                   <br/>
        </div>
       
        </div>
    );
  }
}

export default Profiles;