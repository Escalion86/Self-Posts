import { LOAD_POSTS, TOGGLE_BOOKED, DELETE_POST, ADD_POST } from "../types"
import { DB } from "../../db"
import * as FileSystem from "expo-file-system"

export const loadPosts = () => {
  return async (dispatch) => {
    const posts = await DB.getPosts()

    dispatch({
      type: LOAD_POSTS,
      payload: posts,
    })
  }
}

export const toggleBooked = (post) => async (dispatch) => {
  await DB.updatePost(post)

  dispatch({
    type: TOGGLE_BOOKED,
    payload: post.id,
  })
}

export const deletePost = (id) => async (dispatch) => {
  await DB.deletePost(id)

  dispatch({
    type: DELETE_POST,
    payload: id,
  })
}

export const addPost = (post) => async (dispatch) => {
  const fileName = post.img.split("/").pop()
  const newPath = FileSystem.documentDirectory + fileName

  try {
    await FileSystem.moveAsync({
      to: newPath,
      from: post.img,
    })
  } catch (e) {
    console.log("Error:", e)
  }

  const payload = {
    ...post,
    img: newPath,
  }

  const id = await DB.createPost(payload)

  payload.id = id

  dispatch({
    type: ADD_POST,
    payload,
  })
}
