const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api/login", "/api/register", "/api/logout", "/api"],
    createProxyMiddleware({
      target: "http://localhost:4001",
    })
  );
};
