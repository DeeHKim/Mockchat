import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import {setName} from '../actions/actions'

class WelcomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };
  }

  setName() {
    this.props.setName(this.state.name);
  }

  handleInputChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>Enter your name here:</h1>
        <p> Name: {this.state.name} </p>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleInputChange.bind(this)}
        />
        <Link to="/events">
          <Button bsStyle="primary" onClick={this.setName.bind(this)}>Submit</Button>
        </Link>
      </div>
    )
  }
}

export default connect(
  (state)=>{
    return {}
  },
  {
    setName
  }
)(WelcomePage);
