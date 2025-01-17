'use client';

import React, { useEffect, useState } from 'react';
import PageLayout from '../../../components/PageLayout/PageLayout'; // Import PageLayout
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
    <PageLayout mainContent={<ListLayout products={products} />} />  // Pass ListLayout as mainContent
  );
};

export default ProductManagementPage;
