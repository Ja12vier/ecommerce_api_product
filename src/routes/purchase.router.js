const {getAll, getOne, create, remove, update}=require("../controllers/purchase.controllers");
const express=require("express");
const verifyJWT = require("../utils/verifyJWT");


const purchaseRouter=express.Router();

purchaseRouter.route("/")
.get(verifyJWT,getAll)
.post(verifyJWT,create)


purchaseRouter.route("/:id")
.get(verifyJWT,getOne)
.put(verifyJWT,update)
.delete(verifyJWT,remove)



module.exports=purchaseRouter