const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).send({ message: "Login is required." });
  }

  try {
    const tokenDatas = jwt.verify(token, process.env.SECRET);

    req.body.payload = tokenDatas;

    next();
  } catch (err) {
    return res.status(403).send({ message: "Forbidden. " });
  }
};
