import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import {messages, newMessage, receiveMessage, type, stopTyping} from '../actions/actions'
import io from 'socket.io-client';

let socket = null;

class ChatPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      typing: false,
      typerList: []
    };
  }

  componentDidMount () {
    socket = io('', {
            path: '/api/chat',
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 10 });
    console.log('socket', socket);
    const {receiveMessage, type, stopTyping} = this.props;
    var that = this;
    this.props.messages(this.props.chatData.channelID);
    socket.emit('chatmounted', this.props.userName);
    var obj = {
      channelid: this.props.chatData.channelID,
      username: this.props.userName
    };
    socket.emit('join channel', obj);
    socket.on('new message', function(msg) {
      console.log('this.props', this.props);
      receiveMessage(msg);
    });
    socket.on('typing', function(user) {
      type(user);
    });
    socket.on('stop typing', function(user) {
      stopTyping(user);
    });
    socket.on('test socket', function(msg) {
      console.log("YOOOOOOOOO", msg);
    });
  }

  componentWillUnmount() {
    console.log("isthisunmounting");
    socket.emit('leave channel', this.props.chatData.channelID);
  }

  componentDidUpdate() {
    let d = document.getElementById('scroll');
    let isScrolledToBottom = d.scrollHeight - d.clientHeight <= d.scrollTop + 1;
    d.scrollTop = d.scrollHeight;
  }

  chatMessages() {
    console.log("chatstate", this.state);
    return (this.props.chatData.list).map((entry) => {
      if(entry.image === "0") {
        return(
          <div>
            <span style={{fontWeight: "bold", fontSize: 25}}>{entry.user}</span>
            <span>{entry.text}</span>
          </div>
        )
      }
      if(entry.image === "1"){
        return(
          <div>
            <span style={{fontWeight: "bold", fontSize: 25}}>{entry.user}</span>
            <span><img src={entry.text} stye={{width: 150, height: 150}}/></span>
          </div>
        )
      }
    });
  }

  handleInputChange(e) {
    this.setState({
      input: e.target.value
    });
    if(e.target.value.length > 0 && !this.state.typing) {
      socket.emit('typing', {user: this.props.userName, channel: this.props.chatData.channelID});
      this.setState({typing: true});
    }
    if(e.target.value.length === 0 && this.state.typing) {
      socket.emit('stop typing', {user: this.props.userName, channel: this.props.chatData.channelID});
      this.setState({typing: false});
    }
  }

  submitMessage(e) {
    console.log("HI", e);
    console.log("SOCKETSOCKET", socket);
    e.preventDefault();
    let data = {
      eventID: this.props.chatData.channelID,
      text: this.state.input,
      image: "0",
      user: this.props.userName
    };
    socket.emit('new message', data);
    socket.emit('stop typing', {user: this.props.userName, channel: this.props.chatData.channelID});
    this.props.newMessage(data);
    this.props.receiveMessage(data);
    this.setState({ input: "", typing: false }, function() {
      document.getElementById("hiii").value=this.state.input;
    });
  }

  typers() {
    return (this.props.chatData.typingList).map((user) => {
      return (
        <span>{user}</span>
      );
    });
  }

  read(e) {
    console.log("OKAY!!", this.refs.myFile.files);
    let data = this.refs.myFile.files;
    let reader = new FileReader();
    e.preventDefault();
    let info = {};
    console.log("wtfisthisdata", data);
    reader.addEventListener('load', (event) => {
      info['text'] = event.target.result;
      info['eventID'] = this.props.chatData.channelID;
      info['user'] = this.props.userName;
      info["image"] = "1";
      this.props.newMessage(info);
      this.props.receiveMessage(info);
      socket.emit('new message', info);
    });
    reader.readAsDataURL(data[0]);
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
        <input
          type="file"
          ref="myFile"
          id="picFile"
          accept="image/*"
        />
        <Button onClick={this.read.bind(this)}>Upload Image</Button>
        <div>
        {this.typers()}
        <span> is typing...</span>
        </div>
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
    receiveMessage,
    type,
    stopTyping
  }
)(ChatPage);
