const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token
  const token = req.header('x-auth-token');
  console.log('in authMiddleware with token');
  console.log(token);
  console.log('---------');

  if (!token) {
    return res.status(401).json({ error: 'no token' });
  }

  // Verify token
  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    console.log('decodedToken: ', decodedToken);
    req.user = decodedToken.user;
    next();
  } catch (error) {
    console.error('error with token verification');
    res.status(401).json({ message: 'token is not valid' });
  }
};

module.exports = authMiddleware;
