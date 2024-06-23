const middy = require("@middy/core");

const routes = [
  {
    method: "GET",
    path: "/users",
  },
  {
    method: "POST",
    path: "/users",
  },
  {
    method: "PUT",
    path: "/users/{id}",
  },
  {
    method: "DELETE",
    path: "/users/{id}",
  },
];

module.exports = routes;
