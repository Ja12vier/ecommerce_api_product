const {getAll, create, remove}=require("../controllers/category.controllers");
const express=require("express");
const verifyJWT = require("../utils/verifyJWT.js");

const categoryRouter=express.Router();

categoryRouter.route("/")
.get(verifyJWT,getAll)
.post(verifyJWT,create)

categoryRouter.route("/:id")
.delete(verifyJWT,remove)



module.exports=categoryRouter;