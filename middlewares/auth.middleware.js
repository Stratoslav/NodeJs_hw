const { json } = require("body-parser");
const { verifyToken } = require("../services/token.services");

const checkAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      json.status(401).sed("no token provided");
    }
    const data = await verifyToken(token);
    if (!data) {
      json.status(403).send("Unauthorized");
    }
    req.userId = data.id;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = checkAuthMiddleware;
