import { GET_RECORDS_STARTED, GET_RECORDS_SUCCEEDED, GET_RECORDS_FAILED } from '../actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
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
  }
  return state
}
