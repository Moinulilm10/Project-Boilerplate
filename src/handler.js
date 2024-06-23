const middy = require("@middy/core");
const httpRouter = require("@middy/http-router");
const httpErrorHandler = require("@middy/http-error-handler");
const jsonBodyParser = require("@middy/http-json-body-parser");
const routes = require("./routes/routes");

const baseHandler = async (event) => {
  return {
    statusCode: 404,
    body: JSON.stringify({ message: "Not Found" }),
  };
};

const handler = middy(baseHandler)
  .use(jsonBodyParser())
  .use(httpRouter({ routes }))
  .use(httpErrorHandler());

module.exports = { handler };
