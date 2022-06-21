const User = require("../models/user");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Create a new User
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    // Hash the user's password
    password: bcrypt.hashSync(req.body.password, 8),
  });

  // Save the user to the database
  user.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(401).send({ message: err });
      return;
    }
    // Check if the user exists
    if (!user) {
      return res.status(401).send({ message: "Invalid username or password" });
    }
    // Check if the password submitted matches the user's password
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid username or password!",
      });
    }
    // Generate a web token
    var token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,

      accessToken: token,
    });
  });
};
