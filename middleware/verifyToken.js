import jwt from 'jsonwebtoken';
import { SECRET_ACCESS_TOKEN } from '../config/index.js';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Ensure the token is passed in the header
  if (!authHeader) {
    return res.status(403).json({
      error: 'failed',
      message: 'Authorization header is missing!',
    });
  }

  // Get the token part of the header
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({
      error: 'failed',
      message: 'Token is missing!',
    });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, SECRET_ACCESS_TOKEN);
    req.user = decoded; // Attach user info from token to request object
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'failed',
      message: 'Unauthorized! Invalid token',
    });
  }
};

export default verifyToken;
