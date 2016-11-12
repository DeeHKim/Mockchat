import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import {eventList, setChannel, createEvent} from '../actions/actions'

class EventPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    }
  }

  componentDidMount() {
    this.props.eventList();
  }

  buttonClick(entry) {
    this.props.setChannel(entry)
  }

  eventItems () {
    return (this.props.eventData).map((entry) => {
      return (
        <Link to="/chat">
          <Button bsStyle="primary" onClick={() => {this.buttonClick(entry)}}>
            {entry.name}
          </Button>
        </Link>
      )
    })
  }

  handleInputChange (e) {
    this.setState({
      name: e.target.value
    });
  }

  createEvent () {
    this.props.createEvent(this.state.name);
    this.props.eventList();
  }

  render() {
    return (
      <div>
        <h1> Wanna create an event? </h1>
        <input
          type='text'
          value={this.state.name}
          onChange={this.handleInputChange.bind(this)}
        />
        <button onClick={this.createEvent.bind(this)}>submit</button>
        <h1 font="bold"> Events you are connected to: </h1>
        {this.eventItems()}
      </div>
    )
  }
}

export default connect(
  (state)=>{
    return {
      eventData: state.eventData.list
    }
  },
  {
    eventList,
    setChannel,
    createEvent
  }
)(EventPage);
