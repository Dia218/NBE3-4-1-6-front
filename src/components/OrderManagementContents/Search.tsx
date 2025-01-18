import React from 'react';
import styles from './Search.module.css';

interface SearchProps {
  searchEmail: string;
  onSearchEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchProps: React.FC<SearchProps> = ({ searchEmail, onSearchEmailChange, onKeyPress }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="이메일로 검색"
        value={searchEmail}
        onChange={onSearchEmailChange}
        onKeyDown={onKeyPress}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchProps;
