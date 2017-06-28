import { getStoryIds, getStory } from './index.js';

describe('api ', () => {
  it('should return an array of story ids', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json() {
          return [0, 1, 2, 3, 4];
        },
      })
    );

    const storyIds = await getStoryIds();
    expect(storyIds.length).toBe(5);
  });

  it('should return story data', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json() {
          return { title: 'Test' };
        },
      })
    );

    const story = await getStory();
    expect(story).toEqual({ title: 'Test' });
  });
});
