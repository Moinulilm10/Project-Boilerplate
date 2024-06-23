const middy = require("@middy/core");
const httpErrorHandler = require("@middy/http-error-handler");
const jsonBodyParser = require("@middy/http-json-body-parser");
const UserModel = require("../models/UserModel");

const getAllUsers = async () => {
  const users = await UserModel.getAllUsers();
  return {
    statusCode: 200,
    body: JSON.stringify(users),
  };
};

const createUser = async (event) => {
  const data = event.body;
  const newUser = await UserModel.createUser(data);
  return {
    statusCode: 201,
    body: JSON.stringify(newUser),
  };
};

const updateUser = async (event) => {
  const data = event.body;
  const updatedUser = await UserModel.updateUser(event.pathParameters.id, data);
  if (updatedUser) {
    return {
      statusCode: 200,
      body: JSON.stringify(updatedUser),
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "User not found" }),
    };
  }
};

const deleteUser = async (event) => {
  await UserModel.deleteUser(event.pathParameters.id);
  return {
    statusCode: 204,
    body: JSON.stringify({}),
  };
};

const getAllUsersHandler = middy(getAllUsers)
  .use(jsonBodyParser())
  .use(httpErrorHandler());
const getUserByIdHandler = middy(getUserById)
  .use(jsonBodyParser())
  .use(httpErrorHandler());
const createUserHandler = middy(createUser)
  .use(jsonBodyParser())
  .use(httpErrorHandler());
const updateUserHandler = middy(updateUser)
  .use(jsonBodyParser())
  .use(httpErrorHandler());
const deleteUserHandler = middy(deleteUser)
  .use(jsonBodyParser())
  .use(httpErrorHandler());

module.exports = {
  getAllUsersHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
