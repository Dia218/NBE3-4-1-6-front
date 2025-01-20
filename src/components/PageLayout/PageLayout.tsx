'use client'; // Ensures client-side rendering

import React from "react";
import { useRouter } from 'next/navigation';
import { PageButtonType } from '../../lib/enum/PageButtonType';
import { SideButtonType } from '../../lib/enum/SideButtonType';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  mainContent: React.ReactNode; // 메인 콘텐츠
  sidebarContent?: React.ReactNode; // 사이드바 (선택)
  pageButtonType?: PageButtonType; // 페이지 이동 버튼 타입 (선택)
  targetPage?: string; // 이동할 페이지 경로
  sideButtonType?: SideButtonType; // 사이드 버튼 타입 (선택)
  targetEvent?: string; // 사이드 버튼 클릭 시 이동할 이벤트 (선택)
  sideButtonAction?: () => void; // 사이드 버튼 클릭 시 실행할 사용자 정의 동작 (선택)
  onSideButtonClick?: (type: SideButtonType) => void; // 사이드 버튼 클릭 시 상위로 이벤트 전달
}

const PageLayout: React.FC<PageLayoutProps> = ({
  mainContent,
  sidebarContent,
  pageButtonType,
  targetPage,
  sideButtonType,
  targetEvent,
  sideButtonAction,
  onSideButtonClick, // 추가된 props
}) => {
  const router = useRouter();

  const handlePageButtonClick = () => {
    if (targetPage) {
      router.push(targetPage); // 특정 페이지로 이동
    }
  };

  const handleSideButtonClick = () => {
    if (sideButtonAction) {
      sideButtonAction(); // 사용자 정의 동작 실행
    }
    if (onSideButtonClick && sideButtonType) {
      onSideButtonClick(sideButtonType); // 상위 컴포넌트로 이벤트 전달
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {pageButtonType && (
          <button className={styles.pageButton} onClick={handlePageButtonClick}>
            {pageButtonType}
          </button>
        )}
        <header className={styles.header}>Grid&Circle</header>
        {sideButtonType && (
          <button className={styles.sideButton} onClick={handleSideButtonClick}>
            {sideButtonType}
          </button>
        )}
      </div>
      <div className={styles.body}>
        <main className={styles.content}>{mainContent}</main>
        {sidebarContent && <aside className={styles.sidebar}>{sidebarContent}</aside>}
      </div>
    </div>
  );
};

export default PageLayout;
