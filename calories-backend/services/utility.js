import jwt from 'jwt-simple'
import secret from '../secret'
import moment from 'moment'
const UserSchema = require('../models').userSchema

exports.tokenForUser = function(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, secret)
}

exports.validateEmail = function(email) {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

exports.compareLogsByDates = function(a, b) {
  if (moment(a.date) <= moment(b.date)) {
    return -1
  }
  return 1
}

exports.addMealLog = function(user, req, res) {
  const { title, date, calories } = req.body
  const logs = user.mealLog
  const log = {
    title,
    calories: parseFloat(calories),
    date
  }
  logs.push(log)
  user.mealLog = logs
  UserSchema.findOneAndUpdate({ _id: user._id }, user, err => {
    if (err) return res.status(500).send()
    return res.status(200).send({ _id: user.mealLog[user.mealLog.length - 1]._id })
  })
}

exports.removeMealLog = function(user, req, res) {
  const logId = req.params.logId
  let logs = user.mealLog
  logs = logs.filter(doc => {
    return doc._id != logId
  })
  user.mealLog = logs
  UserSchema.findOneAndUpdate({ _id: user._id }, user, err => {
    if (err) return res.status(500).send()
    return res.status(200).send({ user: user })
  })
}

exports.editMealLog = function(user, req, res) {
  const logId = req.params.logId
  const { title, date, calories } = req.body
  let logs = user.mealLog
  const logIndex = logs.findIndex(log => log._id == logId)
  if (logIndex === -1) {
    return res.status(404).send()
  }
  let editLog = logs[logIndex]
  editLog.title = title || editLog.title
  editLog.date = date || editLog.date
  editLog.calories = calories || editLog.calories
  logs[logIndex] = editLog
  user.mealLog = logs
  UserSchema.findOneAndUpdate({ _id: user._id }, user, err => {
    if (err) return res.status(500).send()
    return res.status(200).send({ user: user })
  })
}

exports.getUser = function(user, req, res) {
  let userObj = {
    email: user.email,
    createdAt: user.createdAt,
    role: user.role,
    expectedCalories: user.expectedCalories
  }
  return res.status(200).send({ user: userObj })
}

exports.editUser = function(user, req, res, isAdmin) {
  const { role, expectedCalories } = req.body
  if (isAdmin) {
    user.role = role || user.role
  }
  user.expectedCalories = expectedCalories || user.expectedCalories
  UserSchema.findOneAndUpdate({ _id: user._id }, user, err => {
    if (err) return res.status(500).send()
    return res.status(200).send({ user: user })
  })
}
