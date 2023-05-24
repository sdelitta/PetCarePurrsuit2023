// components/ShoppingCart.js
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import "../CSS/Cart.css"

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const doc = await db.collection("users").doc(user.uid).get();
          const userData = doc.data();
          setCartItems(userData.cartItems);
        }
      } catch (error) {
        console.error("Error fetching cart items: ", error);
      }
    };

    fetchCartItems();
  }, []);

  // Display the list of cart items
  return (
    <div className="cart_page">
      <div className="cart_container">
        <div className="cart_title">
          <p>Shopping Cart</p>
        </div>
        <div className="cart_list">
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
