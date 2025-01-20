'use client';

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
  sideButtonAction?: () => void; // 사이드 버튼 클릭 시 실행할 사용자 정의 동작 (선택)
}

const PageLayout: React.FC<PageLayoutProps> = ({
  mainContent,
  sidebarContent,
  pageButtonType,
  targetPage,
  sideButtonType,
  sideButtonAction
}) => {
  const router = useRouter();

  const handlePageButtonClick = () => {
    if (targetPage) {
      router.push(targetPage); // 특정 페이지로 이동
    }
  };

  const handleSideButtonClick = () => {
    if (sideButtonAction) {
      sideButtonAction(); // 상위 컴포넌트에서 지정한 이벤트
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {pageButtonType && ( // pageButtonType(선택)
          <button className={styles.pageButton} onClick={handlePageButtonClick}>
            {pageButtonType}
          </button>
        )}
        <header className={styles.header}>Grid&Circle</header>
        {sideButtonType && ( // sideButtonType(선택)
          <button className={styles.sideButton} onClick={handleSideButtonClick}>
            {sideButtonType}
          </button>
        )}
      </div>
      <div className={styles.body}>
        <main className={styles.content}>{mainContent}</main> {/* mainContent: 메인 콘텐츠 */}
        {sidebarContent && <aside className={styles.sidebar}>{sidebarContent}</aside>} {/* sidebarContent: 우측 사이드바 (선택) */}
      </div>
    </div>
  );
};

export default PageLayout;
