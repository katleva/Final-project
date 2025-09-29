const logMiddleware = (req, res, next) => {
  const start = Date.now();
  next();
  const duration = Date.now() - start;
  console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
};

export default logMiddleware;
