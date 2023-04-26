import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  selectCart,
  checkoutCart,
  deleteCartItem,
  editCartProduct,
} from "./cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const { userId } = useParams();
  console.log(useParams());
  console.log(userId);
  const dispatch = useDispatch();
  const singleCart = useSelector(selectCart);
  console.log(singleCart);
  const cartId = useSelector((state) => state.auth.me.cartId);

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const cartItems = isLoggedIn
    ? user.cart
    : JSON.parse(localStorage.getItem("cart")) || [];

    // const addToCart = (userId, productId) => {
    //   dispatch(editCartProduct({ userId, productId }));
    // };
    // const removeFromCart = (userId, productId) => {
    //   dispatch(deleteCartItem(userId, productId));
    // };
    // const checkoutCart = (userId) => {
    //   dispatch(checkoutCart(userId));
    // };
    // const clearCart = (userId) => {
    //   dispatch(deleteCartItem(userId));
    //   dispatch(fetchCart(userId));
    // };

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch]);

  //Edit Quantity
  const [qty, editQty] = useState("");

  const handleEdit = async (evt, cartproductId, qty) => {
    evt.preventDefault();
    if (qty && qty > 0 && qty % 1 === 0) {
      await dispatch(editCartProduct({ cartproductId, qty }));
      console.log(qty);
      editQty("");
      Promise.all(fetchCart(userId));
    } else {
      window.alert("Quantity must be filled in and be a positive integer.");
    }
  };

    const handleAddToCart = (product) => {
      if (isLoggedIn) {
        dispatch(addToCart(user.id, product.id));
      } else {
        // o: move this logic into guesCartSlice
        // get existing cart data from local storage
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

        // check if product already exists in cart
        const existingItem = existingCart.find(
          (item) => item.id === product.id
        );

        if (existingItem) {
          // increment quantity if product already exists in cart
          existingItem.quantity += 1;
        } else {
          // add new product to cart with quantity 1
          existingCart.push({ id: product.id, quantity: 1 });
        }

        // o: move this logic into guesCartSlice
        // store updated cart data in local storage
        localStorage.setItem("cart", JSON.stringify(existingCart));
      }
    };


  //Delete Cart Item
  const handleDelete = async (evt, id) => {
    evt.preventDefault();
    await dispatch(deleteCartItem(id));
    window.alert("This item has been removed from your cart.");
  };

  //Checkout Cart
  function handleCheckout(evt) {
    evt.preventDefault();
    dispatch(checkoutCart(cartId));
    window.alert(
      "Your cart has been checked out! Thank you for shopping with us!"
    );
  }

  const { id, fulfilled, createdAt, products } = singleCart?.info || {};

  const totalCost = products?.reduce(
    (total, prod) => total + prod.cartproduct.qty * prod.price,
    0
  );

  return (
    <div id="userCartCard">
      <h1>
        {" "}
        <pre>Cart # {id}</pre>
      </h1>
      <pre>Submitted: {fulfilled}</pre>
      <pre>Cart since: {createdAt}</pre>
      Items:
      <div id="productsInCart">
        {products && products.length
          ? products?.map((prod) => {
              return (
                <div key={`prod inCart:${prod.id}`}>
                  <Link to={`/products/${prod.id}`}>
                    <div id="prodCard">
                      <img id="tinyImg" src={prod.imageUrl} />
                      <div>
                        <p id="prodName">{prod.name}</p>
                        <p id="prodPrice">
                          Quantity: {prod.cartproduct.qty}{" "}
                          <p id="totalPrice">
                            Total: ${prod.cartproduct.qty * prod.price}
                          </p>
                        </p>
                      </div>
                    </div>
                  </Link>
                  <form
                    id="edit-form"
                    onSubmit={(e) => handleEdit(e, prod.cartproduct.id, qty)}
                  >
                    <label htmlFor="name">Edit Quantity:</label>
                    <input
                      name="qty"
                      value={qty}
                      onChange={(e) => editQty(e.target.value)}
                    />
                    <div className="button-box">
                      <button type="submit">Edit</button>
                    </div>
                  </form>
                  <div className="delete-button">
                    <button
                      onClick={(e) => handleDelete(e, prod.cartproduct.id)}
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })
          : "You Got an empty Cart :("}
      </div>
      <div id="cartTotal">
        <p>Total Cost: ${totalCost}</p>
      </div>
      <Link to="/checkout">
        <button id="checkout" onClick={handleCheckout}>
          Checkout Cart
        </button>
      </Link>
    </div>
  );
};

export default Cart;
