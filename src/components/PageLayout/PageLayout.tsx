import React from "react";
import styles from './PageLayout.module.css';

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>Grid&Circle</header>
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default PageLayout;
