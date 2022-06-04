import React, { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import { getProducts } from '../../services';
import Navbar from '../../components/Navbar/Navbar';
import ProductsList from '../../components/ProductsList/ProductsList';

function CustomerProducts() {
  const { userData, products, saveProducts } = useContext(Context);

  useEffect(() => {
    getProducts(userData.token)
      .then((response) => saveProducts(response.products))
      .catch((e) => console.log(e));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <ProductsList products={ products } />
    </div>
  );
}

export default CustomerProducts;
