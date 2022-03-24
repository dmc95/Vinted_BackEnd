const express = require("express");
const router = express.Router();
const cloudinary= require("cloudinary").v2;

//Import des Models
const User = require("../Models/User");
const Offer = require("../Models/Offer");

const isAuthenticated = require("../middleware/isAuthenticated");

// création d'une offre
router.post("/offer/publish", isAuthenticated, async (req, res) => {
  try {
    // console.log(req.fields);
    // console.log(req.files.picture.path);

    // Destructuring
    const { 
      title, 
      description, 
      price, 
      condition, 
      city, 
      brand, 
      size, 
      color 
    } = req.fields;
    // Création d'une nouvelle annonce
    const newOffer= new Offer({
      product_name:title,
      product_description:description,
      product_price:price,
      product_details:[
        {ÉTAT:condition},
        {EMPLACEMENT:city},
        {MARQUE:brand},
        {TAILLE:size},
        {COULEUR:color},
      ],
      owner:req.user,
    });
    //Envoi de l'image à cloudinary
    const result= await cloudinary.uploader.upload(req.files.picture.path,{
      folder: `/vinted/offers:${newOffer._id}`,
    })
    // console.log(result);
    newOffer.product_image = result;
    //Sauvegarde de l'annonce
    await newOffer.save();
    res.json({newOffer});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//====================================================================//
// route permettant de récupérer des offres en bdd
router.get('/offers', async (req, res)=>{
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    res.status(400).json({ message:error.message })
  }
})

//====================================================================//
//route permettant de chercher une offre avec un système de filtre
router.get('offers/search', async (req, res)=>{
  try {
    
  } catch (error) {
    res.status(400).json({ message:error.message })
  }
})




//Export du router
module.exports = router;
