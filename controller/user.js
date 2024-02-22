const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json"));
let users = data.users;

exports.createUser = (req, res) => {
  console.log(req.body);
  users.push(req.body);
  res.json(req.body);
};
exports.getAllUsers = (req, res) => {
  res.json(users);
};

exports.getUser = (req, res) => {
  const id = +req.params.id;
  const User = users.find((p) => p.id === +id);
  console.log(User);
  res.json(User);
};

exports.replaceUser = (req, res) => {
  const id = +req.params.id;
  const UserIndex = users.findIndex((p) => p.id === +id);
  users.splice(UserIndex, 1, { ...req.body, id: id });
  res.status(201).json({ type: "PUT" });
};

exports.updateUser = (req, res) => {
  const id = +req.params.id;
  const UserIndex = users.findIndex((p) => p.id === +id);
  const oldUser = users[UserIndex];
  users.splice(UserIndex, 1, { ...oldUser, ...req.body });
  res.status(201).json({ type: "PATCH" });
};
exports.deleteUser = (req, res) => {
  const id = +req.params.id;
  const UserIndex = users.findIndex((p) => p.id === +id);
  users.splice(UserIndex, 1);
  res.status(201).json({ type: "DELETE" });
};
