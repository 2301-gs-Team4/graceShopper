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

router.post("/:productId/:cartId/:qtyId", async (req, res, next) => {
  try {
    const productId = req.params.id.productId;
    const cartId = req.params.id.cartId;
    const qtyId = req.params.id.qtyId;
    console.log(productId,cartId,qtyId)
    const newCartProd = await CartProduct.create({qty: qtyId, productId: productId, cartId:cartId })
    res.status(201).send(newCartProd)
    // const userId = req.user.id;
    // const product = await Product.findByPk(productId);
    // if (!product) {
    //   res.status(404).send("Product not found");
    //   return;
    // }

    // await req.user.addProductToCart(productId);
    // res.json({ message: "Product added to cart" });
  } catch (error) {
    next(error);
  }
});

router.put("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.send(await product.update({ qty: req.body.qty }));
  } catch (error) {
    next(error);
  }
});
