import { LOAD_POSTS, TOGGLE_BOOKED, DELETE_POST, ADD_POST } from "../types"

const initialState = {
  posts: [],
  loading: true,
}

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      }
    case TOGGLE_BOOKED:
      const posts = state.posts.map((post) => {
        if (post.id === action.payload) {
          post.booked = !post.booked
        }
        return post
      })
      return {
        ...state,
        posts,
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      }
    case ADD_POST:
      return {
        ...state,
        posts: [{ ...action.payload }, ...state.posts],
      }

    default:
      return state
  }
}
