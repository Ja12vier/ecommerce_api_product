


const catchError=require("../utils/catchError");
const Product=require("../models/Product");
const Category = require("../models/Category");
const Productimg = require("../models/Productimg");
const { Op } = require("sequelize");

const getAll=catchError(async(req, res)=>{
    const {title,price }=req.query;
    const where={};
    if(title) where.title= {[Op.iLike]: `%${title}%`};
    if(price) where.price=price;
    const result = await Product.findAll({include: [Category, Productimg], where})
    return res.json(result)
});

const create=catchError(async(req, res)=>{
    const result=await Product.create(req.body)
    return res.status(201).json(result)
     
});

const getOne=catchError(async(req, res)=>{
    const {id}=req.params;
    const result=await Product.findByPk(id)
    if(!result) return res.sendStatus(404)
    return res.json(result)
});

const remove=catchError(async(req, res)=>{
    const {id}=req.params;
    await Product.destroy({where: {id}})
    return res.sendStatus(204)
});

const update=catchError(async(req, res)=>{
    const {id}=req.params;
    delete req.body.email;
    delete req.body.password;
    const result= await Product.update(
        req.body,
        {where: {id}, returning: true}
    )
    if(result[0]==[0]) return res.sendStatus(404)
    return res.status(200).json(result[1][0])
});

const setProductimg=catchError(async(req, res)=>{
    const {id}=req.params;
    const product=await Product.findByPk(id)
    if(!product) return res.sendStatus(404)
    await product.setProductimgs(req.body)
    const productImg=await product.getProductimgs()
    return res.json(productImg)
});


module.exports={
    getAll,
    getOne,
    create,
    remove,
    update,
    setProductimg
};