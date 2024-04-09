import { URL_ARTICLES, URL_SEARCH, form, main } from './modules/const.js';
import { createSection } from './modules/createElements.js';
import { fetchRequest } from './modules/fetchRequest.js';
import { renderArticles } from './modules/render.js';
import preload from './modules/preload.js';

const init = () => {
  preload.show();
  return Promise.all([
    fetchRequest(URL_ARTICLES, {
      callback: renderArticles,
      headers: {
        'X-Api-Key': '3480bb0f363a413e8bbd551eb5b74208',
      },
    }),
  ]);
};

init().then((data) => {
  preload.remove();
  const postItems = createSection('Свежие новости');
  postItems.innerHTML = '';
  postItems.append(...data[0]);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  main.innerHTML = '';
  preload.show();
  const formData = new FormData(form);
  const dataPost = Object.fromEntries(formData);

  const url = new URL(URL_SEARCH);
  url.searchParams.append('q', dataPost.search);

  const init = () => {
    return Promise.all([
      fetchRequest(url, {
        callback: renderArticles,
        headers: {
          'X-Api-Key': '3480bb0f363a413e8bbd551eb5b74208',
        },
      }),
      fetchRequest(URL_ARTICLES, {
        callback: renderArticles,
        headers: {
          'X-Api-Key': '3480bb0f363a413e8bbd551eb5b74208',
        },
      }),
    ]);
  };

  init().then((data) => {
    preload.remove();
    form.reset();
    const postList = createSection(
      `По вашему запросу ${dataPost.search} найдено ${data[0].length} результатов`,
    );
    postList.append(...data[0]);

    const postTopList = createSection('Свежие новости');
    const slicedArray = data[1].slice(0, 4);

    postTopList.append(...slicedArray);
  });
});
