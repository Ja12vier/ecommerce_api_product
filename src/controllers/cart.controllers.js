


const catchError=require("../utils/catchError");
const Cart=require("../models/Cart");
const Product = require("../models/Product");


const getAll=catchError(async(req, res)=>{
    let userId=req.user.id;
    const result = await Cart.findAll({include: [Product], where: {userId}})
    return res.json(result)
});

const create=catchError(async(req, res)=>{
    const {quantity , productId}=req.body;
    let userId=req.user.id;
    const result=await Cart.create({quantity, userId, productId})
    return res.status(201).json(result)
     
});

const getOne=catchError(async(req, res)=>{
    const {id}=req.params;
    const result=await Cart.findByPk(id)
    if(!result) return res.sendStatus(404)
    return res.json(result)
});

const remove=catchError(async(req, res)=>{
    const {id}=req.params;
    await Cart.destroy({where: {id}})
    
    return res.sendStatus(204)
});

const update=catchError(async(req, res)=>{
    const {id}=req.params;
    delete req.body.userId;
    delete req.body.productId;
    const result= await Cart.update(
        req.body,
        {where: {id}, returning: true}
    )
    if(result[0]==[0]) return res.sendStatus(404)
    return res.status(200).json(result[1][0])
});



module.exports={
    getAll,
    getOne,
    create,
    remove,
    update,

};