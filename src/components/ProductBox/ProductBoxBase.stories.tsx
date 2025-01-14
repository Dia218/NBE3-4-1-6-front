import React from 'react';
import ProductBoxBase from '../../components/ProductBox/ProductBoxBase';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'ProductBoxBase',
  component: ProductBoxBase,
} as Meta;

const productProps = {
  image: 'https://coffeegdero.com/web/product/big/202309/469d46aa4f5c2b39f5fab5be7fb9219a.jpg',
  name: 'Sample Product',
  description: 'This is a sample product description.',
  price: '$20.00',
};

export const Default: StoryFn = () => <ProductBoxBase {...productProps} />;