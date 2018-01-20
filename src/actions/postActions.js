import {
  URL,
  getUUID,
  HEADER,
  GET_POSTS,
  ADD_POST,
  GET_SINGLE_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST,
} from './constants'

export function getPosts() {
  return (dispatch) => {
    fetch(`${URL}/posts`, { HEADER })
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_POSTS, payload: data }))
      .catch((err) => console.error(err))
  }
}

export function getSinglePost(postId) {
  return (dispatch) => {
    fetch(`${URL}/posts/${postId}`, { HEADER })
      .then((res) => dispatch({ type: GET_SINGLE_POST, payload: res.json() }))
      .catch((err) => console.error(err))
  }
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
    fetch(`${api}/post`, {
      method: 'POST',
      headers: {
        ...HEADER,
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then((res) =>
        dispatch({
          type: ADD_POST,
          payload: res,
        })
      )
      .catch((err) => console.error(err))
  }
}

//@flow
export function votePost(postId: string, option: string) {
  return (dispatch) => {
    fetch(`${api}/posts/${postId}`, {
      method: 'POST',
      headers: {
        ...HEADER,
        'Content-Type': 'text/plain',
      },
      body: option,
    })
      .then((res) => res.json())
      .catch((err) => console.error(err))
  }
}
