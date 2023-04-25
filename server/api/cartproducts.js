const router = require("express").Router();
const {
  models: { User, Cart, Product, CartProduct },
} = require("../db");
module.exports = router;

//Fetches all CartProducts
router.get("/", async (req, res, next) => {
  try {
    const cartProducts = await CartProduct.findAll();
    res.json(cartProducts);
  } catch (err) {
    next(err);
  }
});

//Adds a product to the Cart
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await CartProduct.create(req.body));
  } catch (error) {
    next(error);
  }
});

//Deletes a product from the cart
router.delete("/:cartproductId", async (req, res, next) => {
  try {
    const cartProduct = await CartProduct.findByPk(req.params.cartproductId);
    await cartProduct.destroy();
    res.send(cartProduct);
  } catch (error) {
    next(error);
  }
});

//Updates the product in the cart
router.put("/:cartproductId", async (req, res, next) => {
  try {
    const cartProduct = await CartProduct.findByPk(req.params.cartproductId);
    res.send(await cartProduct.update(req.body));
  } catch (error) {
    next(error);
  }
});
