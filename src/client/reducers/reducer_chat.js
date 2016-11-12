import { SETCHANNEL, MESSAGES, RECEIVEMESSAGE } from '../actions/actions'

const INITIAL_STATE = {channelID: "", name: "", list: []}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SETCHANNEL:
      return {...state, channelID: action.payload._id, name: action.payload.name}
    case MESSAGES:
      return {...state, list: action.payload}
    case RECEIVEMESSAGE:
      console.log('awefwekf', action.payload);
      return {...state, list: [...state.list, action.payload]}
    default:
      return state
  }
}
