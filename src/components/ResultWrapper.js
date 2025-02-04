import React from 'react';
import { useLocation } from 'react-router-dom';
import Result from './Result';

const ResultWrapper = () => {
  const location = useLocation();  
  return <Result location={location} />;  
};

export default ResultWrapper;
