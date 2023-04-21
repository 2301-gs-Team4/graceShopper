import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, selectCart } from "./cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const { userId } = useParams();
  console.log(useParams());
  console.log(userId);
  const dispatch = useDispatch();
  const singleCart = useSelector(selectCart);
  console.log(singleCart)
  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch]);

  function handleDelete(evt) {
    console.log("delete" + evt.target);
    // dispatch(clearCart)
    //need to use clear cart for the delete functionality
  }

  const { id, fulfilled, createdAt, products } = singleCart.info;

  return (
    <div id="userCartCard">
     <h1> <pre>Cart # {id}</pre></h1>
      <pre>Submitted: {fulfilled}</pre>
      <pre>Cart since: {createdAt}</pre>
      Items:
      <div id="productsInCart">

        {products && products.length
          ? products.map((prod) => {
              return (
                <div key={`prod inCart:${prod.id}`}>
                  <Link to={`/products/${prod.id}`}>
                    <div id="prodCard">
                      <img id="tinyImg" src={prod.imageUrl} />
                      <small>{prod.name}</small>
                      <small>
                        {prod.cartproduct.qty + "at" + "$" + prod.price}
                      </small>
                    </div>
                  </Link>
                  <button id="cartDeleteItemBtn" onClick={handleDelete}>
                    x
                  </button>
                </div>
              );
            })
          : "You Got A empty Cart :("}
      </div>
    </div>
  );
};

export default Cart;
