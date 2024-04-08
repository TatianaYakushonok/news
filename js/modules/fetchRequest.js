export const fetchRequest = async (
  url,
  { method = 'GET', callback, body, headers },
) => {
  try {
    const options = {
      method,
    };
    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      if (callback) return callback(null, data);
      return;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    return callback(err);
  }
};

export const getDataGoods = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
