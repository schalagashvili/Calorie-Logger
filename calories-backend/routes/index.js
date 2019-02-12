/* eslint-disable no-unused-vars */
import passport from 'passport'
import '../services/passport'
const Controller = require('../controllers').default
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = app => {
  app.post('/signIn', requireSignin, Controller.authController.signIn)
  app.post('/signUp', Controller.authController.signUp)

  app.post('/createUser', requireAuth, Controller.authController.createUser)

  app.post('/addMealLog/:userId?', requireAuth, Controller.userController.addMealLog)
  app.post('/removeMealLog/:logId/:userId?', requireAuth, Controller.userController.removeMealLog)
  app.post('/editMealLog/:logId/:userId?', requireAuth, Controller.userController.editMealLog)
  app.post('/getMealLogs/:userId?', requireAuth, Controller.userController.getMealLogs)

  app.get('/getUser/:userId?', requireAuth, Controller.userController.getUser)
  app.post('/editUser/:userId?', requireAuth, Controller.userController.editUser)
  app.delete('/deleteUser/:userId', requireAuth, Controller.userController.deleteUser)

  app.get('/getAllUsers/:page', requireAuth, Controller.userController.getAllUsers)
}
