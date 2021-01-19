const redis = require("redis");
// var url = require("url")

let client = redis.createClient(process.env.REDIS_URL);

// if (process.env.REDIS_URL) {
//   var rtg = require("url").parse(process.env.REDIS_URL);
//   client = require("redis").createClient(rtg.port, rtg.hostname);

//   client.auth(rtg.auth.split(":")[1]);
// } else {
//   return client;
// }

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
