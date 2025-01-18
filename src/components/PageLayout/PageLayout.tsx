'use client'; // Ensures client-side rendering

import React from "react";
import { useRouter } from 'next/navigation'; // Correct import for useRouter
import { PageButtonType } from '../../lib/enum/PageButtonType';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  mainContent: React.ReactNode; // 메인 콘텐츠
  pageButtonType?: PageButtonType; // 버튼 타입 (선택)
  sidebarContent?: React.ReactNode; // 사이드바 (선택)
  targetPage?: string; // 이동할 페이지 경로
}

const PageLayout: React.FC<PageLayoutProps> = ({ mainContent, sidebarContent, pageButtonType, targetPage }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (targetPage) {
      router.push(targetPage); // 특정 페이지로 이동
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {pageButtonType && ( // pageButtonType이 있을 때만 렌더링
          <button className={styles.pageButton} onClick={handleButtonClick}>
            {pageButtonType}
          </button>
        )}
        <header className={styles.header}>Grid&Circle</header>
      </div>
      <div className={styles.body}>
        <main className={styles.content}>{mainContent}</main>
        {sidebarContent && <aside className={styles.sidebar}>{sidebarContent}</aside>}
      </div>
    </div>
  );
};

export default PageLayout;