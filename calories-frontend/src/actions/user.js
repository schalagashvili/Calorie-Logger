import {
  GET_USER_STARTED,
  GET_USER_SUCCEEDED,
  GET_USERS_FAILED,
  USER_LOGIN_STARTED,
  USER_LOGIN_SUCCEEDED,
  USER_LOGIN_FAILED,
  DELETE_USER_STARTED,
  DELETE_USER_SUCCEEDED,
  UDELETE_USER_FAILED,
  GET_ALL_USERS_STARTED,
  GET_ALL_USERS_SUCCEEDED,
  GET_ALL_USERS_FAILED,
  EDIT_USER_STARTED,
  EDIT_USER_SUCCEEDED,
  EDIT_USER_FAILED,
  ADD_NEW_USER_STARTED,
  ADD_NEW_USER_SUCCEEDED,
  ADD_NEW_USER_FAILED,
  SIGN_UP_USER_STARTED,
  SIGN_UP_USER_SUCCEEDED,
  SIGN_UP_USER_FAILED,
  EDIT_USER_CALORIES_STARTED,
  EDIT_USER_CALORIES_SUCCEEDED,
  EDIT_USER_CALORIES_FAILED
} from '../actionTypes'
import {
  RSAA
} from 'redux-api-middleware'
import config from '../config'

export function getUser(userId, token) {
  return async function (dispatch) {
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


export function editUserCalories(userId, token, expectedCalories) {
  return async function (dispatch) {
    await dispatch({
      [RSAA]: {
        endpoint: `${config.apiUrl}/editUser/${userId != null ? userId : ''}`,
        types: [EDIT_USER_CALORIES_STARTED, EDIT_USER_CALORIES_SUCCEEDED, EDIT_USER_CALORIES_FAILED],
        headers: {
          Authorization: token
        },
        method: 'put',
        body: JSON.stringify({
          expectedCalories
        })
      }
    })
  }
}

export function userLogin(email, password) {
  return async function (dispatch) {
    await dispatch({
      [RSAA]: {
        endpoint: `${config.apiUrl}/signIn`,
        types: [USER_LOGIN_STARTED, USER_LOGIN_SUCCEEDED, USER_LOGIN_FAILED],
        method: 'post',
        body: JSON.stringify({
          email,
          password
        })
      }
    })
  }
}

export function deleteUser(id, token) {
  return async function (dispatch) {
    await dispatch({
      [RSAA]: {
        endpoint: `${config.apiUrl}/deleteUser${id}`,
        types: [DELETE_USER_STARTED, DELETE_USER_SUCCEEDED, UDELETE_USER_FAILED],
        method: 'delete',
        headers: {
          Authorization: token
        },
      }
    })
  }
}

export function getAllUsers(token) {
  return async function (dispatch) {
    await dispatch({
      [RSAA]: {
        endpoint: `${config.apiUrl}/getAllUsers`,
        types: [GET_ALL_USERS_STARTED, GET_ALL_USERS_SUCCEEDED, GET_ALL_USERS_FAILED],
        method: 'get',
        headers: {
          Authorization: token
        },
      }
    })
  }
}

export function editUser(viewId, token, role) {
  return async function (dispatch) {
    await dispatch({
      [RSAA]: {
        endpoint: `${config.apiUrl}/editUser/${viewId}`,
        types: [EDIT_USER_STARTED, EDIT_USER_SUCCEEDED, EDIT_USER_FAILED],
        headers: {
          Authorization: token
        },
        method: 'post',
        body: JSON.stringify({
          role
        })
      }
    })
  }
}

export function addNewUser(email, password, role, token) {
  return async function (dispatch) {
    await dispatch({
      [RSAA]: {
        endpoint: `${config.apiUrl}/createUser`,
        types: [ADD_NEW_USER_STARTED, ADD_NEW_USER_SUCCEEDED, ADD_NEW_USER_FAILED],
        method: 'post',
        headers: {
          Authorization: token
        },
        body: JSON.stringify({
          email,
          password,
          role
        })
      }
    })
  }
}

export function userSignUp(email, password) {
  return async function (dispatch) {
    await dispatch({
      [RSAA]: {
        endpoint: `${config.apiUrl}/signUp`,
        types: [SIGN_UP_USER_STARTED, SIGN_UP_USER_SUCCEEDED, SIGN_UP_USER_FAILED],
        method: 'post',
        body: JSON.stringify({
          email,
          password
        })
      }
    })
  }
}