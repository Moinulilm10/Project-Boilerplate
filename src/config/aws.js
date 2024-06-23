const dotenv = require("dotenv");
const AWS = require("aws-sdk");

dotenv.config();

AWS.config.update({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
});

const dynamodbClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: process.env.AWS_API_VERSION,
});

module.exports = { dynamodbClient };
