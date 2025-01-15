import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ListLayout from './ListLayout';
import { ProductDTO } from '../../lib/types/ProductDTO';

export default {
  title: 'Components/ListLayout',
  component: ListLayout,
} as Meta;

const Template: StoryFn<{ products: ProductDTO[] }> = (args) => <ListLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  products: [
    {
      productId: 1,
      productName: 'Coffee Beans - Dark Roast',
      productDescription: 'Rich and bold dark roast coffee beans.',
      productPrice: 20.99,
      productImageURL: 'https://via.placeholder.com/150',
      productStock: 100,
    },
    {
      productId: 2,
      productName: 'Coffee Beans - Medium Roast',
      productDescription: 'Smooth and balanced medium roast coffee beans.',
      productPrice: 18.49,
      productImageURL: 'https://via.placeholder.com/150',
      productStock: 50,
    },
    {
      productId: 3,
      productName: 'Coffee Beans - Light Roast',
      productDescription: 'Bright and vibrant light roast coffee beans.',
      productPrice: 19.99,
      productImageURL: 'https://via.placeholder.com/150',
      productStock: 75,
    },
  ],
};
