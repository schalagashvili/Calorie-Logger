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
module.exports = (app) => {
	app.post('/signIn', requireSignin, Controller.authController.signIn);
	app.post('/signUp', Controller.authController.signUp);
	// app.get('/getUser', requireAuth, Controller.userController.getUser);
	// app.put('/updateUser', requireAuth, Controller.userController.updateUser);
};
