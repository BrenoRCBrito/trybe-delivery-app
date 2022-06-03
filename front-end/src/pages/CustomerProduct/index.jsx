import React, { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import { getProducts } from '../../services';
import Navbar from '../../components/Navbar/Navbar';
import ProductsList from '../../components/ProductsList/ProductsList';
// import LoginForm from '../../components/LoginComponents/Form';

function CustomerProducts() {
  const { userData, products, setProducts } = useContext(Context);
  console.log(userData);
  console.log(products);

  useEffect(() => {
    getProducts(userData.token)
      .then((response) => {
        setProducts(response.products);
      })
      .catch((e) => console.log(e));
  }, [setProducts, userData.token]);

  return (
    <div>
      <Navbar />
      <ProductsList products={ products } />
    </div>
  );
}

export default CustomerProducts;
