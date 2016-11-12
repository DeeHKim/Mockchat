import { EVENT } from '../actions/actions'

const INITIAL_STATE = {list: []}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case EVENT:
      if(action.payload.length < 1) {
        return state
      } else {
        return {...state, list: action.payload}
      }
    default:
      return state
  }
}
