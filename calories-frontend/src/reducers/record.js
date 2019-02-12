import {
  ADD_RECORD_STARTED,
  ADD_RECORD_SECCEEDED,
  ADD_RECORD_FAILED,
  GET_RECORDS_STARTED,
  GET_RECORDS_SUCCEEDED,
  GET_RECORDS_FAILED,
  EDIT_RECORD_STARTED,
  EDIT_RECORD_SECCEEDED,
  EDIT_RECORD_FAILED
} from '../actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_RECORD_STARTED:
      console.log(action, 'ექშენი')
      return {
        loading: true,
        errors: {},
        data: {}
      }
    case ADD_RECORD_SECCEEDED:
      console.log(action, 'ექშენი')
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    case ADD_RECORD_FAILED:
      console.log(action, 'ექშენი')
      return {
        loading: false,
        errors: action.payload,
        data: {}
      }
    case GET_RECORDS_STARTED:
      console.log(action, 'ექშენი')
      return {
        loading: true,
        errors: {},
        data: {}
      }
    case GET_RECORDS_SUCCEEDED:
      console.log(action, 'ექშენი')
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    case GET_RECORDS_FAILED:
      return {
        loading: false,
        errors: action.payload,
        data: {}
      }
    case EDIT_RECORD_STARTED:
      console.log(action, 'ექშენი')
      return {
        loading: true,
        errors: {},
        data: {}
      }
    case EDIT_RECORD_SECCEEDED:
      console.log(action, 'ექშენი')
      return {
        loading: false,
        errors: {},
        data: action.payload
      }
    case EDIT_RECORD_FAILED:
      console.log(action, 'ექშენი')
      return {
        loading: false,
        errors: action.payload,
        data: {}
      }
  }
  return state
}
