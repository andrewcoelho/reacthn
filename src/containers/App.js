import React, { Component } from 'react';
import Waypoint from 'react-waypoint';

import { getStoryIds, getStory } from 'api';
import Layout from 'components/Layout';
import Spinner from 'components/Spinner';
import StoryList from 'components/StoryList';

class App extends Component {
  state = {
    page: 0,
    stories: [],
    storyIds: [],
    isLoading: false,
  };

  async componentDidMount() {
    const storyIds = await getStoryIds();

    this.setState({ storyIds });
  }

  componentDidUpdate(prevProps, prevState) {
    const newIds = prevState.storyIds[0] !== this.state.storyIds[0];
    const newPage = prevState.page !== this.state.page;

    if (newIds || newPage) {
      this.getStories();
    }
  }

  getStories = () => {
    this.setState({ isLoading: true });

    const { page, storyIds } = this.state;
    const startIndex = page * 10;
    const endIndex = startIndex + 10;
    const targetStoryIds = storyIds.slice(startIndex, endIndex);

    let loaded = 0;
    targetStoryIds.forEach(async id => {
      const story = await getStory(id);
      loaded += 1;

      if (loaded === 10) {
        this.setState(state => ({
          stories: state.stories.concat([story]).sort(this.sortStories),
          isLoading: false,
        }));
      } else {
        this.setState(state => ({
          stories: state.stories.concat([story]).sort(this.sortStories),
        }));
      }
    });
  };

  sortStories = (storyA, storyB) => {
    if (storyA.time < storyB.time) return 1;
    if (storyA.time > storyB.time) return -1;
    return 0;
  };

  loadMoreStories = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  renderWaypoint = () => {
    if (this.state.storyIds.length) {
      if (this.state.storyIds.length === this.state.stories.length) {
        return "You've reached the end of the list";
      }

      if (!this.state.isLoading) {
        return <Waypoint onEnter={this.loadMoreStories} />;
      }
    }

    return <Spinner />;
  };

  render() {
    return (
      <Layout>
        <StoryList stories={this.state.stories} />
        {this.renderWaypoint()}
      </Layout>
    );
  }
}

export default App;
