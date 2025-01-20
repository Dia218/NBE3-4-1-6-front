import { ProductDTO } from '../types/ProductDTO';
import { ErrorDetails } from "../types/ErrorDetails";
import { ProductRequestDTO } from "../types/ProductRequestDTO";

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
 * Deletes a product in the backend.
 * @param productId The ID of the product to delete.
 * @returns A promise resolving to void.
 */
export const deleteProduct = async (productId: number) => {
  const response = await fetch(`${BASE_URL}/${productId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
};


/**
 * Creates a new product in the backend.
 * @param fromData The product details to create.
 */
export async function createProduct(
  formData : ProductRequestDTO
) {
  // fetch 전송 (아래의 코드 api로 분리 가능)
  try {
      const response = await fetch('http://localhost:8080/seller/products', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
      });

      if(!response.ok) {
          const errorData: ErrorDetails = await response.json()
          alert(`오류: ${errorData.message}`);
          return;
      }
      
      alert('상품 등록이 성공적으로 처리됐습니다.');
  } catch (error) {
      console.log(error)
      alert('상품 등록 처리 중 오류가 발생했습니다.');
  }
};


/**
 * Updates an existing product in the backend.
 * @param formData The product details(includes productId) to create.
 */
export async function updateProduct(
  formData : ProductDTO
) {
  // fetch 전송 (아래의 코드 api로 분리 가능)
  try {
      const response = await fetch(`http://localhost:8080/seller/products/${formData.productId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
      });

      if(!response.ok) {

          const errorData: ErrorDetails = await response.json()
          alert(`오류: ${errorData.message}`);
          return;
      }
      
      alert('상품 수정이 성공적으로 처리됐습니다.');
  } catch (error) {
      alert('상품 등록 처리 중 오류가 발생했습니다.');
  }
};