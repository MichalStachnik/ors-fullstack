const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'no token' });
  }

  // Verify token
  try {
    console.log('process.env.token', process.env.TOKEN);
    const decodedToken = jwt.verify(token, process.env.TOKEN);

    req.user = decodedToken.user;
    console.log('token valid');
    next();
  } catch (error) {
    console.error('error with token verification');
    res.status(401).json({ message: 'token is not valid' });
  }
};

module.exports = authMiddleware;
