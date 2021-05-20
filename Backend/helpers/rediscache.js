const redis = require("redis");
// var url = require("url")

let client = redis.createClient(process.env.REDIS_URL);


exports.redisMiddleware = (req, res, next) => {
  let key = "__express__" + req.originalUrl || req.url;
  console.log(key);
  client.get(key, (err, reply) => {
    if (reply) {
      return res.send(reply);
    } else {
      res.sendResponse = res.json;
      res.json = (body) => {
        client.set(key, JSON.stringify(body));
        res.sendResponse(body);
      };
      next();
    }
  });
};
