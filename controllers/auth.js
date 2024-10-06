import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_ACCESS_TOKEN } from '../config/index.js'

export async function Register(req, res) {
  const { username, email, password } = req.body

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        error: 'failed',
        data: [],
        message:
          'It seems like you already have an account. Please log in instead.',
      })
    }

    // Create new user
    const newUser = new User({ username, email, password })
    const savedUser = await newUser.save()
    const { ...user_data } = savedUser

    return res.status(200).json({
      status: 'success',
      data: [user_data],
      message: 'Account created successfully',
    })
  } catch (error) {
    console.error('Error occurred during registration:', error)
    return res.status(500).json({
      status: 'failed',
      code: 500,
      data: [],
      message: 'Internal server error',
    })
  }
}

export async function Login(req, res) {
  const { email, password } = req.body;

  try {
    // Find user and explicitly include password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({
        error: 'failed',
        data: [],
        message: 'User not found',
      });
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: 'failed',
        data: [],
        message: 'Incorrect password',
      });
    }

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = user._doc;

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_ACCESS_TOKEN, {
      expiresIn: '1h', // token expires in 1 hour
    });

    // Send the token in the response
    return res.status(200).json({
      status: 'success',
      data: {
        user: userWithoutPassword,
        token,  // Return the generated token
      },
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Error occurred during login:', error);
    return res.status(500).json({
      status: 'failed',
      code: 500,
      data: [],
      message: 'Internal server error',
    });
  }
}

export async function Logout(req, res) {
  try {
    // Optionally, log or do server-side operations here.
    console.log('User logged out');

    // Respond to the client to confirm logout
    return res.status(200).json({
      status: 'success',
      message: 'Logout successful!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      message: 'An error occurred while logging out.',
    });
  }
}
