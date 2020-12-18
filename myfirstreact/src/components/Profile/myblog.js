
import React, {Component} from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";

const Blog = props => (
  <div> <div  className="blogs"><b>{props.todo.UserId}</b></div>
    <div   className="singlepost">
      <br/>
      <div className= "heading"><b>{props.todo.name}</b></div><hr/>
        <img src={props.todo.img}  className="postimg"/>
        <p className="read">{props.todo.desc}</p><br />
    </div><br/></div>
  )


class MyBlogs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post:[]
            
    };
  }

componentDidMount(){
  const token =localStorage.getItem('token');
  const user =localStorage.getItem('user');
if(token){
axios.get('http://localhost:4000/profile/post/'+ user )
  .then(res => {
      this.setState({ post: res.data });
  })
  .catch(function (error){
      console.log(error);
  })
}
}
myBlog() {
    return this.state.post.map(function(curr, i){
        return <Blog todo={curr} key={i} />;
    })
  }
  render() { 
    return (
      <div>
        <div>
                    <h1 className= "myposts">MY POSTS</h1>
                    <div className="post">
                    
                    { this.myBlog() }
                    </div>
                   <br/>
        </div>
       
        </div>
    );
  }
}

export default MyBlogs;