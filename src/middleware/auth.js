// middleware/auth.js
import jwt from 'jsonwebtoken';
// التحقق من التوكن
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token,"asdnljfsadfdjslfiowejfipjfifasnjdifjasof;ljewpofjw;lakfjwadf");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// التحقق من الدور
const authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied: insufficient permissions' });
  }
  next();
};

// Exporting using named exports
export { verifyToken, authorizeRole };
