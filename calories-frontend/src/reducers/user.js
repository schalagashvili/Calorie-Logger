import { GET_USER_STARTED, GET_USER_SUCCEEDED, GET_USERS_FAILED } from '../actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER_STARTED:
      console.log(action)
      return {
        loading: true,
        errors: {},
        data: {}
      }
    case GET_USER_SUCCEEDED:
      console.log(action)
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    case GET_USERS_FAILED:
      return {
        loading: false,
        errors: action.payload,
        data: {}
      }
  }
  return state
}
