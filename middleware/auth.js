const jwt = require("jsonwebtoken");
const { UnAuthenticatedError } = require("../errors");
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("No Token Provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Not Authorized Access to this route");
  }
};

module.exports = authMiddleware;
