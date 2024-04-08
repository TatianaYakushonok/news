import { URL_ARTICLES } from './modules/const.js';
import { fetchRequest } from './modules/fetchRequest.js';
import { renderArticles } from './modules/render.js';

const init = async () => {
  await fetchRequest(URL_ARTICLES, {
    callback: renderArticles,
  });
};

init();
