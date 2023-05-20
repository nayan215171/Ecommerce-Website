import React from 'react'
import  FormatNumber from '../helpers/FormatNumber'
import ProductQuantity from './ProductQuantity'
import { FaTrash } from 'react-icons/fa'
import { useCartContext } from '../context/Cartcontext'

const CartItem = ({id, name, image, price, amount, color}) => {


  const {removeItem, setDecrease, setIncrease} = useCartContext();

  //const setIncrease = () => {
    //amount < stock ? setAmount(amount +  1) : setAmount(stock)
  //}

  //const  setDecrease  = () => {
    //amount > 1 ? setAmount(amount - 1) : setAmount(1)
 // }


  return (
    <div className='cart_heading grid grid-five-column'>
        {/* items-section */}
        <div className="cart-image--name">
            <div>
                <figure>
                    <img src={image} alt={id} />
                </figure>
            </div>
            <div>
              <p>{name}</p>
              <div className="color-div">
                <p>Color:</p>
                <div className="color-style" style={{backgroundColor: color, color: color}}></div>
              </div>
            </div>
        </div>

        {/* price-section */}

        <div className="cart-hide">
          <p> <FormatNumber price={price}/></p>
        </div>

         {/* Quantiity/ */}

         <ProductQuantity amount = {amount} setIncrease = {() => setIncrease(id)} setDecrease = {() => setDecrease(id)}/>

         {/* Subtotal */}

         <div className="cart-hide">
          <p> <FormatNumber price={price * amount} /></p>
         </div>

         {/* Remove / */}

        <div>
          <FaTrash className="remove_icon" onClick={()=> removeItem(id)}/>
        </div>

      
    </div>
  )
}

export default CartItem
