import {
  URL,
  getUUID,
  headers,
  GET_COMMENTS,
  ADD_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from './constants'

//@flow
export function getComments(postId: string) {
  return (dispatch) => {
    fetch(`${URL}/posts/${postId}/comments`, { headers })
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_COMMENTS, payload: data }))
      .catch((err) => console.error(err))
  }
}

//@flow
export function addComment(commentData: object) {
  const { body, author, parentId } = commentData

  const data = {
    id: getUUID(),
    timestamp: Date.now(),
    body,
    author,
    parentId,
  }
  return (dispatch) => {
    fetch(`${URL}/comments`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: ADD_COMMENT,
          payload: data,
        })
      )
      .catch((err) => console.error(err))
  }
}

//@flow
export function voteComment(commentId: string, option: string) {
  return (dispatch) => {
    fetch(`${URL}/comments/${commentId}`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({ option }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: VOTE_COMMENT, payload: data })
      })
      .catch((err) => console.error(err))
  }
}
//@flow
export function deleteComment(commentId: string) {
  return (dispatch) => {
    fetch(`${URL}/comments/${commentId}`, {
      headers: headers,
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: DELETE_COMMENT, payload: data })
      })
  }
}

export function editComment(commentId: string, body: string) {
  return (dispatch) => {
    fetch(`${URL}/comments/${commentId}`, {
      headers: headers,
      method: 'PUT',
      body: JSON.stringify({ body, timestamp: Date.now() }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: EDIT_COMMENT, payload: data })
      })
      .catch((err) => console.error(err))
  }
}
