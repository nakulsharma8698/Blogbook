
import React, {Component} from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import MyBlogs from './myblog';


const Todo = props => (
  <div>
  <div  className="singlepostt" >
    <br/>
    
    <tr>
       
       <td><div className= "dp">&nbsp;&nbsp;<img src={props.todo.dp}  className="postimggg"/>&nbsp;&nbsp;</div></td>
       <td><div className= "userid"><b >&emsp;&emsp;{props.todo.UserId}</b><br /></div>
       <tr> <h2 className= "name"><b>&nbsp;&emsp;{props.todo.Name}</b>&nbsp;&nbsp; <b>Phone: {props.todo.Phone}</b> </h2></tr>
       </td>
     </tr>
      
  </div><br/></div>
)
class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFile: null,
      post: []
            
    };
    this.update = this.update.bind(this);
      this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  update(event)
  {
    event.preventDefault();
    const data = new FormData() 

    data.append('image', this.state.selectedFile);
    axios.post("http://localhost:4000/profile/update", data, { 
      })
      .then(res => { 
        console.log(res.data);
        if(res.data){
          console.log(res.data);
          alert(" Image updated Successfully");
      }

          else
            alert("Failed to Upload");
      })
  }
  onChangeHandler=event=>{
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
    //console.log(event.target.files[0])

}
componentDidMount(){
  const token =localStorage.getItem('token');
if(token){
  axios.get('http://localhost:4000/profile/'+this.props.match.params.UserId , { headers: {"Authorization" : `Bearer ${token}`}})
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
        <Link to={'/profile/'+ user}><li className='active' >My Profile</li></Link>
        <Link to='/post'><li>Add Blog</li></Link>
        <Link to='/profile'><li>BlogBook Users</li></Link>
        <Link to="/developer"><li>About</li></Link>
        <Link to='/'><li style ={{float: 'right'}} onClick = {this.handleLogout}>Logout</li></Link>
       
      </ul>
         
        <br />  <br />
        <div>
                    <div className="post">
                    <form ><input type='file' name="image" onChange={this.onChangeHandler} />
                    <button onClick={this.update}>Add/Update</button></form><br />
                    { this.todoList() }
                    </div>
                   <br/>
        </div>
       <MyBlogs />
        </div>
    );
  }
}

export default Profile;