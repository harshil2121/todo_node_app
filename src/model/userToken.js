const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userTokenStoreSchema = new mongoose.Schema(
  {
    userId: { type: ObjectId, ref: "User" },
    token: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserToken", userTokenStoreSchema);
