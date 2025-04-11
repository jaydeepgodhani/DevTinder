const mongoose = require("mongoose")

const connectDb = async () => {
  await mongoose.connect('mongodb+srv://jaydeep:JaydeepAndHenvika@hnvk.z27qo.mongodb.net/devTinder');
}

module.exports = connectDb;