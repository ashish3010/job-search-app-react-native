import parseResponse from './parse-response';

const options = (methodName, body, headersOpt = {}) => {
  console.log(JSON.stringify(body), 'body')
  return ({
    method: methodName,
    ...(body && { body: JSON.stringify(body) }),
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
      ...headersOpt
    }
  });
}

const timeout = () => (
  new Promise((resolve, reject) => {
    setTimeout(() => (reject(new Error('request timed out'))), 60000);
  })
);

const createFetcher = methodName => (url, body, headers) => {
  console.log(JSON.stringify(url), JSON.stringify(body), JSON.stringify(headers), 'log...');
  return Promise.race([fetch(url, options(methodName, body, headers)), timeout()]).then(parseResponse);
};

export const get = createFetcher('get');
export const post = createFetcher('post');
export const put = createFetcher('put');
export const patch = createFetcher('patch');
export const del = createFetcher('delete');
