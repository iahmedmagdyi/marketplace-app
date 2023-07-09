const JWT = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    //get the token from the header
    const token = req.header("authorization").split(" ")[1];

    const bcryopttoken = JWT.verify(token, process.env.SECRET_KEY);
    req.body.userId = bcryopttoken.userId;

    next();
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
