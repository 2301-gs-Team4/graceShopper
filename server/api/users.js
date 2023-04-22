const router = require("express").Router();
const {
  models: { User, Cart, Product, CartProduct },
} = require("../db");
module.exports = router;

User.prototype.addProductToCart = async function (productId) {
  try {
    const cart = await Cart.findOne({
      where: { userId: this.id },
      // include: {
      //   model: Product,
      //   through: CartProduct,
      // },
    });

    const product = await Product.findByPk(productId);

    if (product) {
      await cart.addProduct(product);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

router.get("/:userId/cart", async (req, res, next) => {
  try {
    const userCart = await Cart.findAll({
      where: { userId: req.params.userId, fulfilled: false },
      include: {
        model: Product,
        through: CartProduct,
      },
    });
    res.json(userCart[0]);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// router.post("/:id/cart/add", async (req, res, next) => {
//   try {
//     //cant quite figure out how to add or create a product in the cart need fresh eyes!!!!!!!!!!!!!
//     res.status(201).send(await CartProduct.create(req.body));
//     //send(await Cart[req.params.id].addProduct(Product[req.body.id]));
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/:id/cartproduct", async (req, res, next) => {
  try {
    const cartProducts = await CartProduct.findAll({
      where: { cartId: req.params.id },
      include: { model: Product },
    });
    res.json(cartProducts);
  } catch (err) {
    next(err);
  }
});
