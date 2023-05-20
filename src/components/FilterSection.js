import React from 'react'
import styled from 'styled-components';
import { useFilterContext } from '../context/Filtercontext';
import {FaCheck} from  'react-icons/fa'
import FormatNumber from '../helpers/FormatNumber'
import {Button} from '../styles/Button'

const FilterSection = () => {

  const  {filters:{text,  colors, price, maxPrice, minPrice}, updateFilterValue, all_products, clearFilters} = useFilterContext();

  // get unique data function
  const getUniqueData = (data, attr) => {
      let newVal = data.map((curElem) => {
        return curElem[attr]
      })

      if(attr === "colors"){
         //  return (newVal = ["All", ...new Set([].concat(...newVal))])
         newVal = newVal.flat()
      }
        return newVal  = ["all", ...new Set(newVal) ]
      
      
      

     
  }

  // getting the unique category data
  const categoryData = getUniqueData(all_products, "category")
  const companyData = getUniqueData(all_products, "company")
  const colorsData = getUniqueData(all_products, "colors")
  
  return <Wrapper>
    <div className="filter-search">
      <form onSubmit={(e) => e.preventDefault()}>
        <input 
        type="text"
        name="text"
        placeholder='search'
        value={text}
        onChange={updateFilterValue}
         />
      </form>
    </div>

    <div className="filter-category">
      <h3>Category</h3>
      <div>
        {
          categoryData.map((curElem, index)=>{
            return <button
             key={index} 
             type="button" 
             name='category' 
             value={curElem} 
             onClick={updateFilterValue}>
             {curElem}
            </button>
          })
        }
      </div>
    </div>

    <div className="filter-company">
      <form action="#">
        <select 
        name="company" 
        id="company" 
        className='filter-company--select'  
        onClick={updateFilterValue}>
          {
            companyData.map((curElem, index)=> {
              return (
                <option key={index} value={curElem} name="company">
                  {curElem}
                </option>
              )
            })
          }
        </select>
      </form>
    </div>

    <div className="filter-colors colors">
      <h3>Colors</h3>
      <div className="filter-color-style">
        {
          colorsData.map((curColor, index) => {
            if(curColor === "all"){
              return (
                <button
                key={index}
                type='button'
                value={curColor}
                name="colors"
                className='color-all--style'
                //style={{backgroundColor: curColor}}
                onClick={updateFilterValue}
                >
                  All
                </button>
                )
            }

            return (
            <button
            key={index}
            type='button'
            value={curColor}
            name="colors"
            className={colors === curColor ? "btnStyle active" : "btnStyle"}
            style={{backgroundColor: curColor}}
            onClick={updateFilterValue}
            >
              {colors === curColor ? <FaCheck className="checkStyle"/>  : null}
            </button>
            )
          })
        }
      </div>
    </div>

    <div className="filter_price">
      <h3>Price</h3>
       <p>
          <FormatNumber price = {price}/>
       </p>
       <input 
       type="range" 
       name='price'
       min={minPrice}
       max={maxPrice}
       value={price}
       onChange={updateFilterValue}
       />
    </div>

    <div className="filter-clear">
      <Button className='btn' onClick={clearFilters}>Clear Filters</Button>
    </div>

  </Wrapper>
}


const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  h3 {
    padding: 2rem 0;
    font-size: bold;
  }
  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }
  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;
      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;
        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }
      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }
  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }
  .filter-color-style {
    display: flex;
    justify-content: center;
  }
  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }
  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }
  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }
  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection