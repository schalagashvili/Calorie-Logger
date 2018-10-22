/* eslint-disable no-unused-vars */
// import passport js framework for tokenization and security for frontend
import passport from 'passport';
// enrich passport with custom modifications
import '../services/passport';
// import controllers
const Controller = require('../controllers').default;

// initialize passport authantication and authorization functions
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

/* express routes for Backend API */
module.exports = app => {
	app.post('/signIn', requireSignin, Controller.authController.signIn);
	app.post('/signUp', Controller.authController.signUp);

	app.post('/createUser', requireAuth, Controller.authController.createUser);

	app.post('/addMealLog/:userId?', requireAuth, Controller.userController.addMealLog);
	app.post('/removeMealLog/:logId/:userId?', requireAuth, Controller.userController.removeMealLog);
	app.post('/editMealLog/:logId/:userId?', requireAuth, Controller.userController.editMealLog);
	app.post('/getMealLogs/:userId?', requireAuth, Controller.userController.getMealLogs);

	app.get('/getUser/:userId?', requireAuth, Controller.userController.getUser);
	app.post('/editUser/:userId?', requireAuth, Controller.userController.editUser);
	app.delete('/deleteUser/:userId', requireAuth, Controller.userController.deleteUser);

	app.get('/getAllUsers', requireAuth, Controller.userController.getAllUsers);
};
