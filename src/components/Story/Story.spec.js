import React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';

import Story from './index';

describe('Story ', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    render(
      <Story
        id={123}
        title="Test"
        time={123456789}
        by="Author"
        url="https://google.com"
      />,
      div
    );
  });

  it('should default to hacker news link if no story url', () => {
    const wrapper = shallow(
      <Story id={123} title="Test" time={123456789} by="Author" />
    );
    expect(wrapper.find('a').prop('href')).toEqual(
      'https://news.ycombinator.com/item?id=123'
    );
  });
});
