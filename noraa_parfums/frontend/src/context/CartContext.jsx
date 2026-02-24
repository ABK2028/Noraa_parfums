import { createContext, useState, useEffect } from "react";

export var CartContext = createContext();

export function CartProvider(props) {
  var children = props.children;

  var [cart, setCart] = useState(function() {
    var saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(function() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart(function(prev) {
      var exists = prev.find(function(item) {
        return item.id === product.id;
      });

      if (exists) {
        return prev.map(function(item) {
          if (item.id === product.id) {
            return Object.assign({}, item, { quantity: item.quantity + 1 });
          } else {
            return item;
          }
        });
      }

      return prev.concat(Object.assign({}, product, { quantity: 1 }));
    });
  }

  function removeFromCart(id) {
    setCart(function(prev) {
      return prev.filter(function(item) {
        return item.id !== id;
      });
    });
  }

  function changeQuantity(id, qty) {
    setCart(function(prev) {
      return prev.map(function(item) {
        if (item.id === id) {
          return Object.assign({}, item, { quantity: qty });
        } else {
          return item;
        }
      });
    });
  }

  return (
    <CartContext.Provider value={{ cart: cart, addToCart: addToCart, removeFromCart: removeFromCart, changeQuantity: changeQuantity }}>
      {children}
    </CartContext.Provider>
  );
}
