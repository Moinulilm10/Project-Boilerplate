const { dynamodbClient } = require("../config/aws");
const crypto = require("crypto");

const Table_Name = "Contact";

const getAllUsers = async () => {
  const params = {
    TableName: Table_Name,
  };
  const result = await dynamodbClient.scan(params).promise();
  return result.Items;
};

const createUser = async (data) => {
  const id = crypto.randomUUID();
  const params = {
    TableName: Table_Name,
    Item: {
      id,
      name: data.name,
      email: data.email,
      phone: data.phone,
    },
  };
  await dynamodbClient.put(params).promise();
  return params.Item;
};

const updateUser = async (id, data) => {
  const params = {
    TableName: Table_Name,
    Key: { id },
    UpdateExpression: "set #name = :name, #email = :email, #phone = :phone",
    ExpressionAttributeNames: {
      "#name": "name",
      "#email": "email",
      "#phone": "phone",
    },
    ExpressionAttributeValues: {
      ":name": data.name,
      ":email": data.email,
      ":phone": data.phone,
    },
    ReturnValues: "UPDATED_NEW",
  };
  const result = await dynamodbClient.update(params).promise();
  return result.Attributes;
};

const deleteUser = async (id) => {
  const params = {
    TableName: Table_Name,
    Key: { id },
  };
  await dynamodbClient.delete(params).promise();
  return { id };
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
