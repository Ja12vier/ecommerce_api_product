const sequelize = require('../utils/connection');
const user=require("../models/User")
require("../models/Category")
require("../models/Product")
require("../models")
require("../models/Cart")
require("../models/Purchase")

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await user.create(  {firstName: "test",
                             lastName : "migrate",
                             email   : "test1234@gmail.com",
                             password : "1234",
                             phone    : 8094   }
            
        )
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();