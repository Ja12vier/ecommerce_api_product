

const catchError=require("../utils/catchError");
const Category=require("../models/Category");
const Product = require("../models/Product");

const getAll=catchError(async(req, res)=>{

    const result = await Category.findAll({include: [Product] })
    return res.json(result)
});

const create=catchError(async(req, res)=>{
    const result=await Category.create(req.body)
    return res.status(201).json(result)
     
});

const getOne=catchError(async(req, res)=>{
    const {id}=req.params;
    const result=await Category.findByPk(id)
    if(!result) return res.sendStatus(404)
    return res.json(result)
});

const remove=catchError(async(req, res)=>{
    const {id}=req.params;
   await Category.destroy({where: {id}})
    
    return res.sendStatus(204)
});

const update=catchError(async(req, res)=>{
    const {id}=req.params;
    delete req.body.email;
    delete req.body.password;
    const result= await Category.update(
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