const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

const { isUser, isAdmin } = require("./adminaccess");

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

router.post("/", isUser, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// Update a product by ID
router.put("/:productId", async (req, res, next) => {
  try {
    const [numAffectedRows, [updatedProduct]] = await Product.update(req.body, {
      where: { id: req.params.productId },
      returning: true,
    });
    if (numAffectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.json(updatedProduct);
    }
  } catch (err) {
    next(err);
  }
});

// Delete a product by ID
router.delete("/:productId", async (req, res, next) => {
  try {
    const numAffectedRows = await Product.destroy({
      where: { id: req.params.productId },
    });
    if (numAffectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
