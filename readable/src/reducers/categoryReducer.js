import { GET_CATEGORIES } from 'actions/constants'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload
    default:
      return state
  }
}
