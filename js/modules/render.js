import { createArticles } from './createElements.js';

export const renderArticles = async (err, data) => {
  if (err) {
    console.warn(err, data);
    const h2 = document.createElement('p');
    h2.style.color = 'red';
    h2.textContent = err;
    document.body.append(h2);
    return;
  }

  const slicedArray = data.articles.slice(0, 8);
  const articles = slicedArray.map(createArticles);

  return articles;
};
