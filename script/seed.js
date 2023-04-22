"use strict";

const {
  db,
  models: { User, Product, CartProduct },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "admin",
      password: "123",
      email: "admin@fullstack.com",
      isAdmin: true,
    }),
    User.create({
      username: "cody",
      password: "123",
      email: "cody@fullstack.com",
    }),
    User.create({
      username: "murphy",
      password: "123",
      email: "murphy@fullstack.com",
    }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "Dress Shoes",
      type: "Formal",
      material: "Leather",
      gender: "M",
      price: 199.99,
      size: "11",
    }),
    Product.create({
      name: "Running Shoes",
      type: "Athletic",
      material: "Nylon",
      gender: "W",
      price: 79.99,
      size: "9.5",
    }),
    Product.create({
      name: "Cozy Socks",
      type: "Casual",
      material: "Cotton",
      gender: "M",
      price: 19.99,
      size: "M",
    }),
    Product.create({
      name: "Dress Socks",
      type: "Formal",
      material: "Wool",
      gender: "M",
      price: 19.99,
      size: "L",
    }),
  ]);

  const cartProducts = await Promise.all([
    CartProduct.create({
      qty: 2,
      productId: products[2].id,
      cartId: 1,
    }),
    CartProduct.create({
      qty: 4,
      productId: products[1].id,
      cartId: 1,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
