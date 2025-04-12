const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to the user collection
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to the user collection
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["ignore", "interested", "accepted", "rejected"],
      message: `{VALUE} is incorrect type`
    },
    required: true,
  }},
  {
    timestamps: true
  }
);

connectionRequestSchema.index({fromUserId : 1});

// normal function only in pre
connectionRequestSchema.pre('save', function (next) {
  const connRequest = this;
  // check if fromUserId and toUserId is same
  if (connRequest.fromUserId.equals(connRequest.toUserId)) {
    throw new Error("Can not send connection request to yourself !");
  }
  next();
})

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest", connectionRequestSchema
);

module.exports = ConnectionRequestModel;