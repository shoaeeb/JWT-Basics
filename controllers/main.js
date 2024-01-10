//check username,password in post(login) request
//if exists create new JWT
//send back to frontend

//setuo authentication so only the request
//with a valid JWT can access the dashboard

//a jwt is just a way to exchange data between two parties
//example- is our frontend app and api
//jwt has a security feature, if the token passes the validation
//that means the token is not tampered with, it is the
//same token that was created by the server
//it provides the integrity of the data
//http is stateless, that means that server does not remember
//the past requests
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    throw new BadRequestError("Please provide email and password");
  //demo
  const id = new Date().getDate();
  //try to keep a payload as small as possible,
  //better for user experience

  //just for demo, in real app we would use a better secret
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const { id, username } = req.user;
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
