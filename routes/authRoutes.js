import express from 'express'
import {registerController,loginController,testController} from '../controllers/authController.js'
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js'

//router object
const router = express.Router()

//REGISTER || POST METHOD
router.post('/register',registerController)

//LOGIN || POST METHOD
router.post('/login',loginController)

//test routes
router.get('/test',requireSignin, isAdmin, testController);

export default router;