import { uuid } from 'uuid'

export const URL = 'http://localhost:3001'
export const HEADER = {
  Accept: 'application/json',
  Authorization: '123456',
}
export function getUUID() {
  return uuid.uuid()
}

//ACTIONS

//Categories
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_CATEGORIES_POSTS = 'GET_CATEGORIES_POSTS'

//Posts
export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'
export const GET_SINGLE_POST = 'GET_SINGLE_POST'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

//COMENTS
export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const GET_SINGLE_COMMENT = 'GET_SINGLE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
