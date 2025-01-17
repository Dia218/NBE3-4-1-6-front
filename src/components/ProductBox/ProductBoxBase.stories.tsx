import { Meta, StoryFn } from '@storybook/react';
import ProductBoxBase from './ProductBoxBase';
import { PageType } from '../../lib/enum/PageType';

export default {
  title: 'Components/ProductBoxBase',
  component: ProductBoxBase,
  argTypes: {
    image: { control: 'text' },
    name: { control: 'text' },
    description: { control: 'text' },
    price: { control: 'text' },
    additionalContent: {
      control: 'radio',
      options: [PageType.AddCart, PageType.ChangeCart],
    },
  },
} as Meta<typeof ProductBoxBase>;

const Template: StoryFn<typeof ProductBoxBase> = (args) => <ProductBoxBase {...args} />;

export const AddCartOption = Template.bind({});
AddCartOption.args = {
  image: 'https://placehold.co/400x400',
  name: 'Sample Product',
  description: 'This is a sample product description.',
  price: '₩10,000',
  additionalContent: PageType.AddCart,
};

export const ChangeCartOption = Template.bind({});
ChangeCartOption.args = {
  image: 'https://placehold.co/400x400',
  name: 'Sample Product',
  description: 'This is a sample product description.',
  price: '₩10,000',
  additionalContent: PageType.ChangeCart,
};

export const DefaultOption = Template.bind({});
DefaultOption.args = {
  image: 'https://placehold.co/600x400',
  name: 'Sample Product',
  description: 'This is a sample product description.',
  price: '₩10,000',
  additionalContent: PageType.Default,
};
