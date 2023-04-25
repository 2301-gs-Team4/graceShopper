const router = require("express").Router();
const {
  models: { User, Cart, Product, CartProduct },
} = require("../db");
module.exports = router;

// Get the default guest user ID
const DEFAULT_GUEST_USER_ID = 1;

User.prototype.addProductToCart = async function (productId) {
  try {
    let cart;
    let user;

    if (this.id) {
      // If the user is authenticated, find their cart
      user = await User.findByPk(this.id);
      cart = await Cart.findOne({
        where: { userId: this.id },
      });
    } else {
      // If the user is not authenticated, create a guest cart
      user = await User.findByPk(DEFAULT_GUEST_USER_ID);
      if (!user) {
        user = await User.create({
          username: "guest",
        });
      }
      cart = await Cart.findOrCreate({
        where: { userId: user.id },
        defaults: { fulfilled: false },
      });
    }

    const product = await Product.findByPk(productId);

    if (product) {
      await cart[0].addProduct(product);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

// Middleware function to generate guest user ID if no user ID is present
const generateGuestUserId = async (req, res, next) => {
  if (!req.params.userId) {
    try {
      // Create a new guest user
      const guestUser = await User.create({
        username: "guest",
      });
      // Set the guest user ID in the request parameters
      req.params.userId = guestUser.id;
    } catch (error) {
      next(error);
    }
  }
  next();
};

// // Apply middleware function to /:userId/cart route
// router.get("/:userId/cart", generateGuestUserId, async (req, res, next) => {
//   try {
//     let user, cart;

//     // Find the user and cart
//     user = await User.findByPk(req.params.userId);
//     cart = await Cart.findOne({
//       where: { userId: req.params.userId, fulfilled: false },
//       include: {
//         model: Product,
//         through: CartProduct,
//       },
//     });

//     res.json(cart);
//   } catch (error) {
//     next(error);
//   }
// });

//Fetches cart by userId and includes products
router.get("/:userId/cart", generateGuestUserId, async (req, res, next) => {
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

// router.get("/:userId/cart", async (req, res, next) => {
//   try {
//     let user, cart;

//     if (!req.params.userId) {
//       // If the user is not authenticated, find the guest cart
//       user = await User.findByPk(DEFAULT_GUEST_USER_ID);
//       if (!user) {
//         res.json([]);
//         return;
//       }
//       cart = await Cart.findOne({
//         where: { userId: user.id, fulfilled: false },
//         include: {
//           model: Product,
//           through: CartProduct,
//         },
//       });
//     } else {
//       // If the user is authenticated, find their cart
//       user = await User.findByPk(req.params.userId);
//       cart = await Cart.findOne({
//         where: { userId: req.params.userId, fulfilled: false },
//         include: {
//           model: Product,
//           through: CartProduct,
//         },
//       });
//     }

//     res.json(cart);
//   } catch (error) {
//     next(error);
//   }
// });

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
