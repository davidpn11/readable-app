import {
  GET_POSTS,
  GET_SINGLE_POST,
  GET_CATEGORIES_POSTS,
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST,
} from '../actions/constants'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload
    case GET_SINGLE_POST:
      return [action.payload]
    case GET_CATEGORIES_POSTS:
      return action.payload
    case ADD_POST:
      return state.concat(action.payload)
    case VOTE_POST:
      return state.map((post) => {
        if (post.id === action.payload.id) {
          post.voteScore = action.payload.voteScore
        }
        return post
      })
    case EDIT_POST:
      return state.map((post) => {
        if (post.id === action.payload.id) {
          post = action.payload
        }
        return post
      })
    case DELETE_POST:
      return state.map((post) => {
        if (post.id === action.payload.id) {
          post = action.payload
        }
        return post
      })
    default:
      return state
  }
}
