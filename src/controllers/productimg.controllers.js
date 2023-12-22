const catchError=require("../utils/catchError");
const Productimg=require("../models/Productimg");
const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");


const getAll=catchError(async(req, res)=>{
    const result=await Productimg.findAll()
    return res.json(result)
});
const create=catchError(async(req, res)=>{
    const {path, filename}=req.file;
    console.log(path)
    const {url, public_id}=await uploadToCloudinary(path, filename)
    const image=await Productimg.create({url, publicId: public_id})
    
    return res.status(200).json(image)
});

const remove=catchError(async(req, res)=>{
   const {id}=req.params;
   const image=await Productimg.findByPk(id)
   if(!image)return res.sendStatus(404)
    deleteFromCloudinary(image.publicId)
   await  image.destroy()
   return res.sendStatus(204)
})
module.exports={
    getAll,
    create,
    remove

}