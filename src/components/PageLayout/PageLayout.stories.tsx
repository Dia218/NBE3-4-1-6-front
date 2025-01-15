import React from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/PageLayout',
  component: PageLayout,
} as Meta;

const DefaultContent = (
  <div>
    <h1>Welcome to the Layout Component</h1>
    <p>This is a child component inside the Layout.</p>
  </div>
);

export const Default: StoryFn = () => <PageLayout>{DefaultContent}</PageLayout>;