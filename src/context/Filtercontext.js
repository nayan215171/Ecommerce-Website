import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./productcontext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text:"",
    category: "all",
    company: "all",
    colors: "all",
    maxPrice: 0,
    minPrice: 0,
    price: 0
  }
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();


  const [state, dispatch] = useReducer(reducer, initialState);

 const setGridView = () => {
     return  dispatch({type : "SET_GRIDVIEW"});
 };

 const setListView = () => {
  return dispatch({type: "SET_LISTVIEW"})
 }

 // sorting function

 const Sorting = (event) => {
      const userValue = event.target.value
      dispatch({type: "GET_SORT_VALUE", payload: userValue})
 }

 // update the filter value function

 const updateFilterValue = (event) => {
     let name = event.target.name;
     let value = event.target.value;

     dispatch({type: "UPDATE_FILTER_VALUE", payload:{name, value}})
 }

 // function to clear all the filters

 const clearFilters = () => {
  dispatch({type: "CLEAR_FILTERS"})
 }

 // to sort the products

 useEffect(() =>  {
    dispatch({type: "SORTING_PRODUCTS"})
    dispatch({type: "FILTER_PRODUCTS"})
 },[products, state.sorting_value, state.filters])

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{ ...state, setGridView,setListView, Sorting, updateFilterValue, clearFilters}}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
