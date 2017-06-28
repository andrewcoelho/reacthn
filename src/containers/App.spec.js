import React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';

import Spinner from 'components/Spinner';
import App from './App';

describe('App ', () => {
  it('should render without crashing', () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json() {
          return {
            id: 123,
            title: 'Test',
            time: 123456789,
            by: 'Author',
          };
        },
      })
    );

    const div = document.createElement('div');
    render(<App />, div);
  });

  it('should add storyIds to state', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ storyIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] });
    expect(wrapper.state('storyIds').length).toBe(10);
  });

  it('should sort the stories by descending time', () => {
    const wrapper = shallow(<App />);
    const stories = [{ time: 1 }, { time: 0 }, { time: 2 }];
    const sorted = stories.sort(wrapper.instance().sortStories);
    expect(sorted[0].time).toBe(2);
  });

  it('should update the page in state when loadMoreStories is called', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().loadMoreStories();
    expect(wrapper.state('page')).toBe(1);
  });

  it('should render a spinner before story ids are fetched', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Spinner).length).toBe(1);
  });

  it('should render a spinner when loading stories', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ isLoading: true });
    expect(wrapper.find(Spinner).length).toBe(1);
  });

  it('should render end of list text when end of list is reached', () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json() {
          return {
            id: 123,
            title: 'Test',
            time: 123456789,
            by: 'Author',
          };
        },
      })
    );

    const wrapper = shallow(<App />);
    wrapper.setState({
      storyIds: [0],
      stories: [
        {
          id: 123,
          title: 'Test',
          time: 123456789,
          by: 'Author',
        },
      ],
    });
    const text = wrapper.instance().renderWaypoint();
    expect(text).toEqual("You've reached the end of the list");
  });
});
