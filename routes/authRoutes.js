import express from 'express'
import {registerController,loginController} from '../controllers/authController.js'

//router object
const router = express.Router()

//REGISTER || POST METHOD
router.post('/register',registerController)

//LOGIN || POST METHOD
router.post('/login',loginController)

export default router;