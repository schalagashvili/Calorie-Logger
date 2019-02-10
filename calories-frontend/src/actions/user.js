import { GET_USER_STARTED, GET_USER_SUCCEEDED, GET_USERS_FAILED } from '../actionTypes'
import { RSAA } from 'redux-api-middleware'
import config from '../config'

export function getUser(userId, token) {
  return async function(dispatch) {
    await dispatch({
      [RSAA]: {
        endpoint: `${config.apiUrl}/getUser/${userId != null ? userId : ''}`,
        types: [GET_USER_STARTED, GET_USER_SUCCEEDED, GET_USERS_FAILED],
        headers: {
          Authorization: token
        },
        method: 'get'
      }
    })
  }
}
