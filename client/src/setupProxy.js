const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    [
      "/test",
      "/api/password",
      "/api/login",
      "/api/register",
      "/api/logout",
      "/api/user",
      "/api",
    ],
    createProxyMiddleware({
      target: "http://localhost:4001",
    })
  );
};
