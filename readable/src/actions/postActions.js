import {
  URL,
  getUUID,
  headers,
  GET_POSTS,
  GET_SINGLE_POST,
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST,
} from './constants'

export function getPosts() {
  return (dispatch) => {
    fetch(`${URL}/posts`, { headers })
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_POSTS, payload: data }))
      .catch((err) => console.error(err))
  }
}
//flow
export const getSinglePost = (id: string) => (dispatch) => {
  return fetch(`${URL}/posts/${id}`, { headers })
    .then((res) => res.json())
    .then((data) => dispatch({ type: GET_SINGLE_POST, payload: data }))
    .catch((err) => console.error(err))
}

//@flow
export function addPost(postData: object) {
  const { title, body, author, category } = postData

  const data = {
    id: getUUID(),
    timestamp: Date.now(),
    title,
    body,
    author,
    category,
  }
  return (dispatch) => {
    fetch(`${URL}/posts`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: ADD_POST,
          payload: data,
        })
      )
      .catch((err) => console.error(err))
  }
}

//@flow
export const votePost = (postId: string, option: string) => (dispatch) => {
  return fetch(`${URL}/posts/${postId}`, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({ option }),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: VOTE_POST, payload: data })
    })
    .catch((err) => console.error(err))
}
//@flow
export const deletePost = (postId: string) => (dispatch) => {
  return fetch(`${URL}/posts/${postId}`, {
    headers: headers,
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: DELETE_POST, payload: data })
    })
}

export function editPost(postId: string, postData: object) {
  const { title, body } = postData
  return (dispatch) => {
    fetch(`${URL}/posts/${postId}`, {
      headers: headers,
      method: 'PUT',
      body: JSON.stringify({ title, body }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: EDIT_POST, payload: data })
      })
      .catch((err) => console.error(err))
  }
}
