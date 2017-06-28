import React from 'react';
import PropTypes from 'prop-types';

import Story from 'components/Story';

const StoryList = ({ stories }) => (
  <ul>
    {stories.map(story => <Story key={story.id} {...story} />)}
  </ul>
);

StoryList.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    by: PropTypes.string.isRequired,
    url: PropTypes.string,
  })).isRequired,
};

export default StoryList;
