'use client';

import React, { useEffect, useState } from 'react';
import ListLayout from '../../../components/ListLayout/ListLayout';
import { getProducts } from '../../../lib/api/sellerProductService';
import { ProductDTO } from '../../../lib/types/ProductDTO';

const ProductManagementPage: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]); //백엔드에서 ProductDTO 가져오기

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product Management</h1>
      <ListLayout products={products} />  {/* ListLayout에 products 전달 */}
    </div>
  );
};

export default ProductManagementPage;