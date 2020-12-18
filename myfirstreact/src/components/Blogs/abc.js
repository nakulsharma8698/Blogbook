import React, { Component } from 'react';
import axios from 'axios';

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: ''
        };
    };

    componentDidMount() {
        axios.get('http://localhost:4000/upload')
        .then((res) => res.json())
        .then((data) => {
            var base64Flag = 'data:image/png;base64,';
            var imageStr = this.arrayBufferToBase64(data.img.data.data);
            this.setState({
                img: base64Flag + imageStr
            })
        })
    }
    display()
    {
        return this.state.img.map(function(curr, i){
            return <Todo todo={curr} key={i} />;
        })
    }

  render() {
    return 
  <div>
      <tbody>{this.display()}</tbody> 
  </div>;
  }
}

export default Image;