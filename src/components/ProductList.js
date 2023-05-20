import React from 'react'
import GridView from './GridView.js'
import ListView from './ListView.js'
import { useFilterContext } from '../context/Filtercontext'

const ProductList = () => {
  
  const {filter_products, grid_view} = useFilterContext();

  if (grid_view === true){
    return <GridView products =  {filter_products} />
  }

  if (grid_view === false){
    return <ListView products = {filter_products} />
  }

 
}

export default ProductList
