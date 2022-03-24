const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cloudinary= require("cloudinary").v2;
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const app = express();
app.use(formidable());

//Import des routes
const userRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer");

//utilisation des routes
app.use(userRoutes);
app.use(offerRoutes);


//connection à la bdd
mongoose.connect("mongodb://localhost/vinted", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
});
//Configuration cloudinary
cloudinary.config({ 
  cloud_name: 'dbzfaosnn', 
  api_key: '639558478356169', 
  api_secret: '8wZoqKBwI-EFLlu_ibz-DD0BG6o',
  secure: true
});

// Permet d'accéder aux variables d'environnement
require("dotenv").config();



app.all("*", (req, res) => {
  res.status(404).json({ message: "Cette page n'existe pas" });
});

app.listen(3000, () => {
  console.log("server started");
});
