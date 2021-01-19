const mongoose = require("mongoose");
const ttl = require("mongoose-ttl");

const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    expireAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  { timestamps: true }
);


tokenSchema.plugin(ttl, { ttl: "30m" });
module.exports = mongoose.model("Token", tokenSchema);
