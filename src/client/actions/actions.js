import Axios from 'axios'

export const USER = 'USER'
export const EVENT = 'EVENT'
export const SETCHANNEL = 'SETCHANNEL'
export const MESSAGES = 'MESSAGES'
export const RECEIVEMESSAGE = 'RECEIVEMESSAGE'



export function setName(input) {
  const name = input;
  return {
    type: USER,
    payload: name
  }
}

export function eventList() {
  return dispatch => {
    Axios.post('http://localhost:3000/events/getEvents', {yo:"hi"}).then(function(res) {
      dispatch({
        type: EVENT,
        payload: res.data.data
      });
    });
  }
}

export function setChannel(input) {
  return {
    type: SETCHANNEL,
    payload: input
  }
}

export function receiveMessage(input) {
  console.log("WOFIJWEOIEWJFOWEI", input);
  return {
    type: RECEIVEMESSAGE,
    payload: input
  }
}

export function createEvent(name) {
  Axios.post('http://localhost:3000/events/newEvent', {
    name: name
  });
}

export function messages(input) {
  return dispatch => {
    Axios.post('http://localhost:3000/messages/getMessages', {
      _id: input
    }).then(function(res) {
      console.log(res);
      dispatch({
        type: MESSAGES,
        payload: res.data
      });
    });
  }
}

export function newMessage(input) {
  return dispatch => {
  Axios.post('http://localhost:3000/messages/newMessage', input).then(function(res) {
    console.log('fuck you');
  });
};
}
