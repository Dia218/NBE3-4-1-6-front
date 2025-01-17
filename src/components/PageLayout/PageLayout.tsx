import React from "react";
import styles from './PageLayout.module.css';

const PageLayout: React.FC<{ mainContent: React.ReactNode }> = ({ mainContent }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>Grid&Circle</header>
      <main className={styles.content}>{mainContent}</main>
    </div>
  );
};

export default PageLayout;
