import { ADD_RECORD_STARTED, ADD_RECORD_SECCEEDED, ADD_RECORD_FAILED } from '../actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_RECORD_STARTED:
      return {
        loading: true,
        errors: {},
        data: {}
      }
    case ADD_RECORD_SECCEEDED:
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    case ADD_RECORD_FAILED:
      return {
        loading: false,
        errors: action.payload,
        data: {}
      }
  }
  return state
}
