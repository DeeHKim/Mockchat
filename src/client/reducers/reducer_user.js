import { USER } from '../actions/actions'

const INITIAL_STATE = {name: ""}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case USER:
      return {...state, name: action.payload}
    default:
      return state
  }
}
