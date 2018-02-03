import {
  GET_POSTS,
  GET_CATEGORIES_POSTS,
  ADD_POST,
  GET_SINGLE_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST,
} from '../actions/constants'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload
    case GET_CATEGORIES_POSTS:
      console.log(action)
      return action.payload
    case ADD_POST:
      return action.payload
    case GET_SINGLE_POST:
      return action.payload
    case VOTE_POST:
      return action.payload
    case EDIT_POST:
      return action.payload
    case DELETE_POST:
      return action.payload
    default:
      return state
  }
}
