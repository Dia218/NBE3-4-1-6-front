import PageLayout from './PageLayout';

export default {
  title: 'Components/PageLayout',
  component: PageLayout,
};

const MainContent = () => <div style={{ backgroundColor: '#f0f0f0', height: '100vh' }}>Main content here</div>;

const SidebarContent = () => <div style={{ backgroundColor: '#ddd', padding: '20px' }}>Sidebar content</div>;

export const WithSidebar = () => (
  <PageLayout
    mainContent={<MainContent />}
    sidebarContent={<SidebarContent />}
  />
);

export const WithoutSidebar = () => (
  <PageLayout mainContent={<MainContent />} />
);
