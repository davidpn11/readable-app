import { URL, HEADER, GET_CATEGORIES, GET_CATEGORIES_POSTS } from './constants'

const head = {
  Accept: 'application/json',
  Authorization: 'token',
}

export function getCategories() {
  console.log(head)

  return (dispatch) =>
    fetch(`${URL}/categories`, head)
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: GET_CATEGORIES, payload: data.categories })
      )
      .catch((err) => console.error(err))
}

//@flow
export function getCategoriesPosts(categoryId: string) {
  return (dispatch) => {
    fetch(`${URL}/${categoryId}/posts}`, { HEADER })
      .then((res) =>
        dispatch({ type: GET_CATEGORIES_POSTS, payload: res.json() })
      )
      .catch((err) => console.error(err))
  }
}
