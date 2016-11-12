import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1> SUH DUDE welcome to KEYBLOC CHAT </h1>
        {this.props.children}
      </div>
    )
  }
}

export default App;
