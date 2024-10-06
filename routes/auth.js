import express from 'express'
import { Register, Login } from '../controllers/auth.js'
import validate from '../middleware/validate.js'
import { check } from 'express-validator'

const router = express.Router()

router.post(
  '/register',
  check('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  check('username')
    .isLength({ min: 5 })
    .not()
    .isEmpty()
    .withMessage('Username too short'),
  check('password')
    .isLength({ min: 8 })
    .not()
    .isEmpty()
    .withMessage('Password must be at least 8 characters long'),
  validate,
  Register
)
router.post(
  '/login',
  check('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  check('password').not().isEmpty().withMessage('Password is required'),
  validate,
  Login
)

router.get('/logout', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Logout successful!',
  })
})

export default router
