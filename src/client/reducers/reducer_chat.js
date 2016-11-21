import { SETCHANNEL, MESSAGES, RECEIVEMESSAGE, ADDTYPER, REMOVETYPER } from '../actions/actions'

const INITIAL_STATE = {channelID: "", name: "", list: [], typingList: []}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SETCHANNEL:
      return {...state, channelID: action.payload._id, name: action.payload.name}
    case MESSAGES:
      return {...state, list: action.payload}
    case RECEIVEMESSAGE:
      console.log('awefwekf', action.payload);
      return {...state, list: [...state.list, action.payload]}
    case ADDTYPER:
      return {...state, typingList: [...state.typingList, action.payload]}
    case REMOVETYPER:
      let temp = [];
      state.typingList.forEach(function(user) {
        if(action.payload !== user) {
          temp.push(user);
        }
      });
      return {...state, typingList: temp}
    default:
      return state
  }
}
