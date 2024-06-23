const middy = require("@middy/core");
const {
  getAllUsersHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("../controllers/userController");

const routes = [
  {
    method: "GET",
    path: "/users",
    handler: getAllUsersHandler,
  },
  {
    method: "POST",
    path: "/users",
    handler: createUserHandler,
  },
  {
    method: "PUT",
    path: "/users/{id}",
    handler: updateUserHandler,
  },
  {
    method: "DELETE",
    path: "/users/{id}",
    handler: deleteUserHandler,
  },
];

module.exports = routes;
