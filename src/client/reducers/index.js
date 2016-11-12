import { combineReducers } from 'redux';

import chatReducer from './reducer_chat'
import userReducer from './reducer_user'
import eventReducer from './reducer_event'

const rootReducer = combineReducers({
  chatData: chatReducer,
  userData: userReducer,
  eventData: eventReducer
});

export default rootReducer
