const {getAll, create, remove}=require("../controllers/productimg.controllers");
const express=require("express");
const upload = require("../utils/multer");
const newLocal = "../utils/verifyJWT.js";
const verifyJWT = require(newLocal);


const productimgRouter=express.Router();

productimgRouter.route("/")
.get(verifyJWT,getAll)
.post(verifyJWT,upload.single("image"), create)

productimgRouter.route("/:id")
.delete(verifyJWT,remove)
module.exports=productimgRouter;