const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);

  // check json web token exists & if verified
  if (token) {
    jwt.verify(token, "Authentication", (error, decodeToken) => {
      if (error) {
        console.log(error.message);
        res.redirect("/");
      } else {
        console.log(decodeToken);
        next();
      }
    });
  } else res.redirect("/login");
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "Authentication", async (error, decodeToken) => {
      if (error) {
        console.log(error.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodeToken);
        let user = await User.findById(decodeToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
