import { GET_CATEGORIES, GET_CATEGORIES_POSTS } from 'actions/constants'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload
    default:
      return state
  }
}
