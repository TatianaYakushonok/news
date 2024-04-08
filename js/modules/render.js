import { createArticles } from './createArticles.js';
import { postList } from './const.js';

export const renderArticles = (err, data) => {
  if (err) {
    console.warn(err, data);
    const h2 = document.createElement('p');
    h2.style.color = 'red';
    h2.textContent = err;
    document.body.append(h2);
    return;
  }

  postList.innerHTML = '';
  const slicedArray = data.articles.slice(0, 8);
  const articles = slicedArray.map(createArticles);
  postList.append(...articles);

  return postList;
};
