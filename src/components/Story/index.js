import React from 'react';
import PropTypes from 'prop-types';
import Timeago from 'react-timeago';

import styles from './styles.css';

const Story = ({ id, title, time, by, url }) => (
  <li className={styles.story}>
    <a
      href={url || `https://news.ycombinator.com/item?id=${id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className={styles.title}>{title}</h2>
    </a>
    <div className={styles.meta}>
      Posted <Timeago date={new Date(time * 1000)} /> by{' '}
      <span className={styles.author}>{by}</span>
    </div>
  </li>
);

Story.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  by: PropTypes.string.isRequired,
  url: PropTypes.string,
};

Story.defaultProps = {
  url: undefined,
};

export default Story;
