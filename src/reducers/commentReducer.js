import {
  GET_COMMENTS,
  ADD_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from '../actions/constants'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload
    case ADD_COMMENT:
      return state.concat(action.payload)
    case VOTE_COMMENT:
      return state.map((comment) => {
        if (comment.id === action.payload.id) {
          comment.voteScore = action.payload.voteScore
        }
        return comment
      })
    case EDIT_COMMENT:
      console.log(action.payload)
      return state.map((comment) => {
        if (comment.id === action.payload.id) {
          comment = action.payload
        }
        return comment
      })
    case DELETE_COMMENT:
      return state.map((comment) => {
        if (comment.id === action.payload.id) {
          comment = action.payload
        }
        return comment
      })
    default:
      return state
  }
}
