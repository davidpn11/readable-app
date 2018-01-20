import { URL, headers, GET_CATEGORIES, GET_CATEGORIES_POSTS } from './constants'

export function getCategories() {
  return (dispatch) =>
    fetch(`${URL}/categories`, { headers })
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: GET_CATEGORIES, payload: data.categories })
      )
      .catch((err) => console.error(err))
}

//@flow
export function getCategoriesPosts(categoryId: string) {
  return (dispatch) => {
    fetch(`${URL}/${categoryId}/posts}`, { headers })
      .then((res) =>
        dispatch({ type: GET_CATEGORIES_POSTS, payload: res.json() })
      )
      .catch((err) => console.error(err))
  }
}
