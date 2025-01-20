import { ProductDTO } from "../types/ProductDTO";

// Base URL for the backend API
const BASE_URL = "http://localhost:8080"; // Spring Boot 백엔드 URL

/**
 * Fetches the cart list from the backend.
 * @returns A promise resolving to an array of ProductDTO objects.
 */
export const getCartList = async (): Promise<ProductDTO[]> => {
  try {
    const response = await fetch(`${BASE_URL}/cart`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch cart list");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cart list:", error);
    throw error;
  }
};

/**
 * Adds a product to the cart.
 * @param productId The ID of the product to add.
 * @param quantity The quantity of the product to add.
 * @returns A promise resolving to void.
 */
export const addToCart = async (
  productId: number,
  quantity: number
): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/add-to-cart?id=${productId}&quantity=${quantity}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add product to cart");
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

/**
 * Removes a product from the cart.
 * @param productId The ID of the product to remove.
 * @returns A promise resolving to void.
 */
export const removeFromCart = async (productId: number): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/remove-from-cart?id=${productId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove product from cart");
    }
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
};

/**
 * Updates the quantity of a product in the cart.
 * @param productId The ID of the product to update.
 * @param quantity The new quantity of the product.
 * @returns A promise resolving to void.
 */
export const updateCartQuantity = async (
  productId: number,
  quantity: number
): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/update-cart?id=${productId}&quantity=${quantity}`,
      {
        method: "PATCH",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update cart quantity");
    }
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    throw error;
  }
};

/**
 * Calculates the total price of the items in the cart.
 * @returns A promise resolving to the total price.
 */
export const calculateTotalPrice = async (): Promise<number> => {
  try {
    const response = await fetch(`${BASE_URL}/total-price`);
    if (!response.ok) {
      throw new Error("Failed to calculate total price");
    }
    const totalPrice = await response.json();
    return totalPrice;
  } catch (error) {
    console.error("Error calculating total price:", error);
    throw error;
  }
};
