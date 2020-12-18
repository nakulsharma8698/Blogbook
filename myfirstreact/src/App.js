import React, { Component } from 'react';
//import Registration from './components/register';
import { Link, Redirect } from "react-router-dom";

import Create from './components/create';
import Common from './components/Common/index.js';
import Register from './components/Register/index.js';
import Footer from './components/Common/footer.js';
import Signin from './components/Home';
import About from './components/Home/about.js';
import Post from './components/Post/post.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Blogs from './components/Blogs';
import Profiles from './components/Profile/profiles';
import Razor from './components/Post/razor';
import Imge from './components/Profile/postabc';
import Profile from './components/Profile/index.js';
import MyBlogs from './components/Profile/myblog';
class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
}
componentDidMount() {
  this.token = localStorage.getItem('token');
}
/*callAPI() {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}

componentWillMount() {
    this.callAPI();
}*/
  render() {
    return (
      <div className="App">
     <Common />
     <Router>
        <Route exact path="/" component={Signin} />
       {/* <Route
                path="/"
                component={() =>
                  this.token ? <Redirect to="/profile" /> : <Signin/>
                }
              />*/}
        <Route exact path="/blogs" component={Blogs} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/profile" component={Profiles} />
        <Route path="/profile/:UserId" component={Profile} />
        <Route exact path="/razor" component={Razor} />
        <Route exact path="/img" component={Imge} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/developer" component={About} />
        <Route exact path="/profile/post/:UserId" component={MyBlogs} />
     </Router>
     <Footer />
      <p className="App-intro">{this.state.apiResponse}</p>
  </div>
    );
  }
}

export default App;