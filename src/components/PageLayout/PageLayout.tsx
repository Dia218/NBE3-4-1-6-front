import React from "react";
import styles from './PageLayout.module.css';

const PageLayout: React.FC<{ 
  mainContent: React.ReactNode; 
  sidebarContent?: React.ReactNode;
}> = ({ mainContent, sidebarContent }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>Grid&Circle</header>
      <div className={styles.body}>
      <main className={styles.content}>{mainContent}</main>
      {sidebarContent && <aside className={styles.sidebar}>{sidebarContent}</aside>}
      </div>
    </div>
  );
};

export default PageLayout;