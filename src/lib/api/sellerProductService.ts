import { ProductDTO } from '../types/ProductDTO';

// Base URL for the backend API
const BASE_URL = 'http://localhost:8080/seller/products';

/**
 * Fetches a paginated list of products from the backend.
 * @param page The page number to fetch (default is 0).
 * @returns A promise resolving to an array of ProductDTO objects.
 */
export const getProducts = async (page: number = 0): Promise<ProductDTO[]> => {
  const response = await fetch(`${BASE_URL}?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data.content; // Assuming the response follows a Spring Boot `Page` structure
};

/**
 * Creates a new product in the backend.
 * @param product The product details to create.
 * @returns A promise resolving to the created ProductDTO object.
 */
export const createProduct = async (product: ProductDTO): Promise<ProductDTO> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  return await response.json();
};

/**
 * Updates an existing product in the backend.
 * @param productId The ID of the product to update.
 * @param product The updated product details.
 * @returns A promise resolving to the updated ProductDTO object.
 */
export const updateProduct = async (
  productId: number,
  product: ProductDTO
): Promise<ProductDTO> => {
  const response = await fetch(`${BASE_URL}/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  return await response.json();
};

/**
 * Deletes a product in the backend.
 * @param productId The ID of the product to delete.
 * @returns A promise resolving to void.
 */
export const deleteProduct = async (productId: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${productId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
};