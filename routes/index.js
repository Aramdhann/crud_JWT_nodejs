import verifyToken from '../middleware/verifyToken.js'
import Auth from './auth.js'
import Book from './book.js'

const Router = (server) => {
  server.get('/', (req, res) => {
    try {
      res.status(200).json({
        status: 'success',
        data: [],
        message: 'API is Working! this is homepage.',
      })
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      })
    }
  })

  server.get('/profile', verifyToken, (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to your profile!',
      user: req.user, // The user info from the token
    })
  })

  server.use('/auth', Auth)
  server.use('/books', Book)
}

export default Router
