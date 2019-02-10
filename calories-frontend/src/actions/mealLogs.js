import {
  ADD_RECORD_STARTED,
  ADD_RECORD_SECCEEDED,
  ADD_RECORD_FAILED,
  GET_RECORDS_STARTED,
  GET_RECORDS_SUCCEEDED,
  GET_RECORDS_FAILED
} from '../actionTypes'
import { RSAA } from 'redux-api-middleware'
import config from '../config'

export function addMealLog(title, calories, date, token, userId) {
  return async function(dispatch) {
    await dispatch({
      [RSAA]: {
        endpoint: `${config.apiUrl}/addMealLog/${userId != null ? userId : ''}`,
        types: [ADD_RECORD_STARTED, ADD_RECORD_SECCEEDED, ADD_RECORD_FAILED],
        headers: {
          Authorization: token
        },
        method: 'POST',
        body: JSON.stringify({
          title,
          calories,
          date
        })
      }
    })
  }
}

export function editMealLog(title, calories, date, token, userId, editId) {
  return async function(dispatch) {
    await dispatch({
      [RSAA]: {
        endpoint: `${config.apiUrl}/editMealLog/${editId}/${userId != null ? userId : ''}`,
        types: [ADD_RECORD_STARTED, ADD_RECORD_SECCEEDED, ADD_RECORD_FAILED],
        headers: {
          Authorization: token
        },
        method: 'POST',
        body: JSON.stringify({
          title,
          calories,
          date
        })
      }
    })
  }
}

export function getMealLogs(fromDate, toDate, fromTime, toTime, page, userId, token) {
  return async function(dispatch) {
    await dispatch({
      [RSAA]: {
        endpoint: `${config.apiUrl}/getMealLogs/${userId != null ? userId : ''}`,
        types: [GET_RECORDS_STARTED, GET_RECORDS_SUCCEEDED, GET_RECORDS_FAILED],
        headers: {
          Authorization: token
        },
        method: 'post',
        body: JSON.stringify({
          fromDate,
          toDate,
          fromTime,
          toTime,
          page
        })
      }
    })
  }
}

export function removeMealLog(fromDate, toDate, fromTime, toTime, page, userId, token) {
  return async function(dispatch) {
    await dispatch({
      [RSAA]: {
        endpoint: `${config.apiUrl}/getMealLogs/${userId != null ? userId : ''}`,
        types: [GET_RECORDS_STARTED, GET_RECORDS_SUCCEEDED, GET_RECORDS_FAILED],
        headers: {
          Authorization: token
        },
        method: 'post',
        body: JSON.stringify({
          fromDate,
          toDate,
          fromTime,
          toTime,
          page
        })
      }
    })
  }
}
