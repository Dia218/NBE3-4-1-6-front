import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className={styles.pagination}>
      {totalPages > 0 && (
        <>
          <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>
            이전
          </button>
          <span>
            {currentPage + 1 <= totalPages ? currentPage + 1 : totalPages} / {totalPages}
          </span>
          <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage + 1 >= totalPages}>
            다음
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
