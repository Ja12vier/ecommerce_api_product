const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const Productimg = require("./Productimg");
const Purchase = require("./Purchase");
const User = require("./User");



Product.belongsTo(Category)
Category.hasMany(Product)


Productimg.belongsTo(Product)
Product.hasMany(Productimg)

Cart.belongsTo(Product)
Product.hasMany(Cart)

Cart.belongsTo(User)
User.hasMany(Cart)

Purchase.belongsTo(Product)
Product.hasMany(Purchase)

Purchase.belongsTo(User)
User.hasMany(Purchase)