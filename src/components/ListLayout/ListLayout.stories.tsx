import { Meta, StoryFn } from '@storybook/react';
import ListLayout from './ListLayout';
import { PageType } from '../../lib/enum/PageType';
import { ProductDTO } from '../../lib/types/ProductDTO';

// Mock data for products
const mockProducts: ProductDTO[] = [
  {
    productId: 1,
    productName: 'Coffee Beans - Dark Roast',
    productDescription: 'Rich and bold dark roast coffee beans.',
    productPrice: 20.99,
    productImageURL: 'https://placehold.co/600x400',
    productStock: 100,
  },
  {
    productId: 2,
    productName: 'Coffee Beans - Medium Roast',
    productDescription: 'Smooth and balanced medium roast coffee beans.',
    productPrice: 18.49,
    productImageURL: 'https://placehold.co/300x400',
    productStock: 50,
  },
  {
    productId: 3,
    productName: 'Coffee Beans - Light Roast',
    productDescription: 'Bright and vibrant light roast coffee beans.',
    productPrice: 19.99,
    productImageURL: 'https://placehold.co/400x400',
    productStock: 75,
  }
];

// Meta for the story
const meta: Meta = {
  title: 'Components/ListLayout',
  component: ListLayout,
  argTypes: {
    pageType: {
      control: {
        type: 'select',
        options: Object.values(PageType),
      },
    },
  },
};

export default meta;

// Template for the Story
const Template: StoryFn<{ pageType: PageType; products: ProductDTO[] }> = (args) => <ListLayout {...args} />;

// Default story with `PageType.Default`
export const Default = Template.bind({});
Default.args = {
  pageType: PageType.Default,
  products: mockProducts,
};

// AddCart story
export const AddCart = Template.bind({});
AddCart.args = {
  pageType: PageType.AddCart,
  products: mockProducts,
};

// ChangeCart story
export const ChangeCart = Template.bind({});
ChangeCart.args = {
  pageType: PageType.ChangeCart,
  products: mockProducts,
};
