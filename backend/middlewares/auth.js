const jwt = require("jsonwebtoken");
const ForbiddenError = require("../errors/ForbiddenError");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new ForbiddenError("Autorização necessária");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ForbiddenError("Token inválido");
  }

  req.user = payload;
  return next();
};

module.exports = auth;
