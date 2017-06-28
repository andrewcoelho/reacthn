const apiBase = 'https://hacker-news.firebaseio.com/v0';

export const getStoryIds = () =>
  fetch(`${apiBase}/newstories.json`)
    .then(result => result.json())
    .then(ids => ids);

export const getStory = id =>
  fetch(`${apiBase}/item/${id}.json`)
    .then(result => result.json())
    .then(story => story);
