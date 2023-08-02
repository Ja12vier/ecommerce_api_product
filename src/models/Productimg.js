const {DataTypes}=require("sequelize");
const sequelize=require("../utils/connection");

const Productimg=sequelize.define("productimg", {
    url:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    publicId:{
        type:DataTypes.STRING,
        allowNull: false
    },
  
  
},
{
    timestamps:false
}


);


module.exports=Productimg;