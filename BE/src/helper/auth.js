const jwt = require("jsonwebtoken");

module.exports = {
  auth: function (req, res, next) {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (!accessToken) {
      return res
        .status(403)
        .send({ message: "Access denied due to missing token" });
    }

    console.log({ accessToken });

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      if (err) {
        return res.status(403).send({ message: "No permission" });
      }
      if (!user.userID || user.Role != "BO") {
        console.log(user);
        return res.status(403).send({ message: "No permission" });
      }
      req.user = user;
      next();
    });
  },
};
