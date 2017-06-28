import React from 'react';
import { render } from 'react-dom';

import StoryList from './index';

describe('StoryList ', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    render(
      <StoryList
        stories={[
          {
            id: 123,
            title: 'Test',
            time: 123456789,
            by: 'Author',
            url: 'https://google.com',
          },
        ]}
      />,
      div
    );
  });
});
