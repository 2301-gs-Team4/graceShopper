const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
const CartProduct = require("../db/models/CartProduct");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/:productId", async (req, res, next) => {
  try {
    res.status(201).send(await CartProduct.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const cartProduct = await CartProduct.findOne({
      where: { productId: req.body.productId, cartId: req.body.cartId },
    });
    await cartProduct.destroy();
    res.send(cartProduct);
  } catch (error) {
    next(error);
  }
});
