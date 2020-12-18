
import React, {Component} from 'react';
import axios from 'axios';

const Todo = props => (
  <tr>
      <td>{props.todo.Name}</td>
      <td>{props.todo.UserId}</td>
      <td>{props.todo.Phone}</td>
      <td>{props.todo.Password}</td>
  </tr>
)
class Imge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: []
           
    };
  }
    componentDidMount(){

      axios.get('http://localhost:4000/profiles/')
      .then(res => {
          this.setState({ post: res.data });
      })
      .catch(function (error){
          console.log(error);
      })

    }
  
    todoList() {
      return this.state.post.map(function(curr, i){
          return <Todo todo={curr} key={i} />;
      })
  }
  render() {
  
    return (
        <div className="App">
           <div>Your Profile is Here</div>
           
           <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>                          
                            <th>Phone</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.todoList() }
                    </tbody>
                </table>
        </div>
    );
  }
}
//<img src={`data:image/jpeg;base64,${binary_data}`} />
export default Imge;