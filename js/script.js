import { URL_ARTICLES, URL_SEARCH, form, main } from './modules/const.js';
import { createSection } from './modules/createElements.js';
import { fetchRequest } from './modules/fetchRequest.js';
import { renderArticles } from './modules/render.js';

const init = async () => {
  const postItems = createSection('Свежие новости');
  const articles = await fetchRequest(URL_ARTICLES, {
    callback: renderArticles,
  });
  postItems.innerHTML = '';
  postItems.append(...articles);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data.search);
    const url = new URL(URL_SEARCH);
    url.searchParams.append('q', data.search);
    const postSearch = await fetchRequest(url, {
      callback: renderArticles,
      headers: {
        'X-Api-Key': '3480bb0f363a413e8bbd551eb5b74208',
      },
    });
    main.innerHTML = '';
    const postList = createSection(
      `По вашему запросу ${data.search} найдено ${articles.length} результатов`,
    );
    postList.append(...postSearch);

    const postTopList = createSection('Свежие новости');
    const slicedArray = articles.slice(0, 4);

    postTopList.append(...slicedArray);
  });
};

init();
