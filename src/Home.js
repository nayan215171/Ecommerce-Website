import React from 'react';
import FeatureProduct from './components/FeatureProduct';
import HeroSection from './components/HeroSection';
import Trusted from './components/Trusted';
import Services from './components/Services';

const Home = () => {

  const  data = {
    name: "My Store"
  }

  return (
  <>
   <HeroSection myData = {data} />   
   <FeatureProduct/>
   <Services/>
   <Trusted/>

  </>

  )
  
}



export default Home;
