const express = require('express');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');
const productimgRouter = require('./productimg.router');
const cartRouter = require('./cart.router');
const purchaseRouter = require('./purchase.router');
const router = express.Router();

// colocar las rutas aquí

router.use("/users", userRouter);
router.use("/categorys", categoryRouter);
router.use("/products", productRouter);
router.use("/imagen_products", productimgRouter);
router.use("/carts", cartRouter);
router.use("/purchases", purchaseRouter)
module.exports = router;