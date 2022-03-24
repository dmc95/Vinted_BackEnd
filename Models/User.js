const mongoose = require("mongoose");


//création des modèles
//modèle user
const User = mongoose.model("User", {
  account: {
    username: {
      required: true,
      type: String,
    },
    phone: Number,
  },
  email: {
    unique: true,
    type: String,
  },
  token: String,
  hash: String,
  salt: String,
  avatar: { Object },
});

module.exports = User;