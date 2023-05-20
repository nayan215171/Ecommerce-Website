const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, amount, product } = action.payload;

    // tackle the existing product

    let existingProduct =  state.cart.find((curItem)=> {
      return curItem.id === id + color
    })


   // console.log(existingProduct);
    
    if (existingProduct){
      let updatedProduct = state.cart.map((curItem)=> {
        if (curItem.id === id + color){
          let newAmount  = curItem.amount + amount;
          if(newAmount >= curItem.max){
          newAmount = curItem.max
          }
     
          return {
            ...curItem,
            amount: newAmount
          }
        }else{
          return curItem
        }
       
      })

      return {
        ...state,
        cart: updatedProduct,
      }
    }
    else{
      let cartProduct = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.image[0].url,
        price: product.price,
        max: product.stock,
      };
  
      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };

    }

   
  }

  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curItem) => curItem.id !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "CLEAR_CART"){
    return {
      ...state,
      cart: []
    }
  }

  if (action.type === "SET_DECREMENT"){
    let updatedProduct = state.cart.map((curItem)=> {
      if (curItem.id === action.payload){
        let decAmount = curItem.amount - 1;
        if (decAmount  <= 1){
          decAmount = 1;
        }
        return{
          ...curItem,
          amount: decAmount
        } 
      }else{
        return curItem
     }
    })
    return{
      ...state,
      cart: updatedProduct
    }
  }

  if (action.type === "SET_INCREMENT"){
    let updatedProduct = state.cart.map((curItem)=> {
      if (curItem.id === action.payload){
        let incAmount = curItem.amount + 1;
        if (incAmount  > curItem.max){
          incAmount = curItem.max;
        }
        return{
          ...curItem,
          amount: incAmount
        } 
      }else{
        return curItem
     }
    })
    return{
      ...state,
      cart: updatedProduct
    }
  }

  if (action.type  === "CART_TOTAL_ITEM"){
    let updatedItemVal = state.cart.reduce((initialVal, curItem)=> {
         let {amount} =  curItem;

         initialVal = initialVal + amount
         return initialVal

    },0)

    return{
      ...state,
      total_item: updatedItemVal
    }
    
  }

  if(action.type === "CART_TOTAL_PRICE"){
    let total_price = state.cart.reduce((initialVal, curItem)=> {
       let {price, amount} = curItem

       initialVal  = initialVal + (price * amount)

       return initialVal;

    },0)
    return{
      ...state,
      total_price

    }
  }

  // if(action.type === "CART_TOTAL_ITEM_PRICE"){
  //   let {total_item, total_price} = state.cart.reduce((accum, curItem)=> {
  //        let {price, amount} = curItem;

  //        accum.total_item += amount;
  //        accum.total_price += price * amount;

  //        return accum;

  //   },{
  //     total_item: 0,
  //     total_price:0
  //   })
  //   return{
  //     ...state,
  //     total_item,
  //     total_price
  //   }
  // }

  return state;
};

export default cartReducer;