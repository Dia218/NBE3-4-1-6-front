import { Meta, StoryFn } from '@storybook/react';
import PageLayout from './PageLayout';
import { PageButtonType } from '../../lib/enum/PageButtonType';

export default {
  title: 'Components/PageLayout',
  component: PageLayout,
} as Meta<typeof PageLayout>;

const Template: StoryFn<typeof PageLayout> = (args) => <PageLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  mainContent: <div>Main content goes here</div>,
};

export const WithButton = Template.bind({});
WithButton.args = {
  mainContent: <div>Main content goes here</div>,
  pageButtonType: PageButtonType.OrderManagement,
};

export const WithSidebar = Template.bind({});
WithSidebar.args = {
  mainContent: <div>Main content goes here</div>,
  sidebarContent: <div>Sidebar content goes here</div>,
};

export const WithButtonAndSidebar = Template.bind({});
WithButtonAndSidebar.args = {
  mainContent: <div>Main content goes here</div>,
  pageButtonType: PageButtonType.ProductManagement,
  sidebarContent: <div>Sidebar content goes here</div>,
};

export const WithoutButtonAndSidebar = Template.bind({});
WithoutButtonAndSidebar.args = {
  mainContent: <div>Main content goes here</div>,
};
