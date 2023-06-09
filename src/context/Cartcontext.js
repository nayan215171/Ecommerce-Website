import { useEffect } from "react";
import { createContext, useContext, useReducer } from "react";        
import reducer from "../reducer/cartReducer";

const CartContext = createContext();


const getLocalCartData = () => {
  let localCartData = localStorage.getItem("cartData");
  if (localCartData === []){
    return [];
  }else{
     return JSON.parse(localCartData)
  }
}

const initialState = {
 // cart: [],
  cart: getLocalCartData(),
  total_item: "",
  total_price: "",
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // increment and decrement function 

  const setIncrease = (id) => {
    dispatch({type: "SET_INCREMENT", payload: id})
  }

  const setDecrease = (id) => {
    dispatch({type: "SET_DECREMENT", payload: id})
  }

  //  to add the item in cart

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  // to Remove the item in cart 

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // to clear the cart

  const clearCart = () => {
      dispatch({type: "CLEAR_CART"})
  }

  // to add the data in local Storage
  // get vs set

  useEffect(()=>{
    //dispatch({type: "CART_TOTAL_ITEM"})
    //dispatch({type: "CART_TOTAL_PRICE"})
    dispatch({type:"CART_TOTAL_ITEM_PRICE"})
    localStorage.setItem("cartData", JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart, setDecrease, setIncrease }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };