import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for matchers like toBeInTheDocument
import ProductBoxBase from '../../components/ProductBox/ProductBoxBase';

describe('ProductBoxBase Component', () => {
    const productProps = {
      image: '/path/to/image.jpg', // Image Url
      name: 'Sample Product',
      description: 'This is a sample product description.',
      price: '$20.00',
    };
  
    test('renders product image, name, description, and price', () => {
      render(<ProductBoxBase {...productProps} />);
  
      // Check if the image is displayed with the correct alt text
      const image = screen.getByAltText('Sample Product');
      expect(image).toBeInTheDocument();
  
      // Check if the product name is rendered
      const productName = screen.getByText('Sample Product');
      expect(productName).toBeInTheDocument();
  
      // Check if the product description is rendered
      const productDescription = screen.getByText('This is a sample product description.');
      expect(productDescription).toBeInTheDocument();
  
      // Check if the price is rendered
      const productPrice = screen.getByText('$20.00');
      expect(productPrice).toBeInTheDocument();
    });
  
    test('renders additional content if provided', () => {
      const additionalContent = <div>Additional Content</div>;
  
      render(<ProductBoxBase {...productProps} additionalContent={additionalContent} />);
  
      // Check if the additional content is rendered
      const additionalContentElement = screen.getByText('Additional Content');
      expect(additionalContentElement).toBeInTheDocument();
    });
  
    test('does not render additional content if not provided', () => {
      render(<ProductBoxBase {...productProps} />);
  
      // Ensure the additional content is not rendered
      const additionalContentElement = screen.queryByText('Additional Content');
      expect(additionalContentElement).toBeNull();
    });
  });