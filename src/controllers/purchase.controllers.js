const catchError=require("../utils/catchError");
const Purchase=require("../models/Purchase");
const Cart = require("../models/Cart");


const getAll=catchError(async(req, res)=>{
    let userId=req.user.id;
    const result = await Purchase.findAll({where: {userId}})
    return res.json(result)
});

const create=catchError(async(req, res)=>{
   let userId=req.user.id;
   const cart=await Cart.findAll({
    where: {userId}, 
    attributes: ["quantity", "userId", "productId"],
     raw: true})

    await Purchase.bulkCreate(cart)
    await  Cart.destroy({where: {userId}})
   return res.status(201).json(cart)
});

const getOne=catchError(async(req, res)=>{
    const {id}=req.params;
    const result=await Purchase.findByPk(id)
    if(!result) return res.sendStatus(404)
    return res.json(result)
});

const remove=catchError(async(req, res)=>{
    const {id}=req.params;
      await Purchase.destroy({where: {id}})
    
    return res.sendStatus(204)
});

const update=catchError(async(req, res)=>{
    const {id}=req.params;
    delete req.body.userId;
    delete req.body.productId;
    const result= await Purchase.update(
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
}