const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/login", "/register"],
    createProxyMiddleware({
      target: "http://localhost:4001",
    })
  );
};
