import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import {messages, newMessage, receiveMessage} from '../actions/actions'
import io from 'socket.io-client';

// const socket = io('', { path: '/api/chat' });

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };
  }

  componentDidMount () {
    const {receiveMessage} = this.props;
    var that = this;
    this.props.messages(this.props.chatData.channelID);
    socket.emit('chatmounted', this.props.userName);
    socket.emit('join channel', this.props.chatData.channelID);
    socket.on('new message', function(msg) {
      console.log('this.props', this.props)
      receiveMessage(msg);
    });
  }

  componentDidUpdate() {
    let d = document.getElementById('scroll');
    let isScrolledToBottom = d.scrollHeight - d.clientHeight <= d.scrollTop + 1;
    d.scrollTop = d.scrollHeight;
  }

  chatMessages() {
    return (this.props.chatData.list).map((entry) => {
      return(
        <div>
          <span style={{fontWeight: "bold", fontSize: 25}}>{entry.user}</span>
          <span>{entry.text}</span>
        </div>
      )
    })
  }

  handleInputChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  submitMessage(e) {
    console.log("HI", e);
    console.log("SOCKETSOCKET", socket);
    e.preventDefault();
    let data = {
      eventID: this.props.chatData.channelID,
      text: this.state.input,
      user: this.props.userName
    };
    socket.emit('new message', data);
    this.props.newMessage(data);
    this.props.receiveMessage(data);
    this.setState({ input: "" }, function() {
      document.getElementById("hiii").value=this.state.input;
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.chatData.name}</h1>
        <div
          id="scroll"
          style={{width: 300, height: 250, overflow: "auto",}}
        >
        {this.chatMessages()}
        </div>
        <form onSubmit={this.submitMessage.bind(this)}>
        <input
        id="hiii"
        type="text"
        value={this.state.input}
        onChange={this.handleInputChange.bind(this)}
        />
        </form>
        <Button onClick={this.submitMessage.bind(this)}>Submit</Button>
      </div>
    )
  }
}

export default connect(
  (state)=>{
    return {
      userName: state.userData.name,
      chatData: state.chatData
    }
  },
  {
    messages,
    newMessage,
    receiveMessage
  }
)(ChatPage);
