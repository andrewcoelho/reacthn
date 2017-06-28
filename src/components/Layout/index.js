import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const Layout = ({ children }) => (
  <main className={styles.container}>
    <h1 className={styles.title}>React Hacker News Reader</h1>
    {children}
  </main>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
