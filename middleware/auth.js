const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).send();
    const payload = jwt.verify(authorization, process.env.SECRET);
    req.user = payload.id;
    next();
  } catch (error) {
    res.status(401).send();
  }
};

module.exports = {
  auth,
};
