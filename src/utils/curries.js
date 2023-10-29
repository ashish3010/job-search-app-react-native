import { loadMockServer } from '../mock';

const cache = new Map();
export const apiCallHandler = (f, shouldMemoize = false, cacheKey) => {
  let resp = {};
  const clearMemoizedFunction = () => {
    cache.delete(cacheKey);
  };

  const apiCaller = async (...args) => {
    try {
      await loadMockServer();
      if (shouldMemoize) {
        const cachedResponse = cache.get(cacheKey);
        if (cachedResponse) {
          resp = cachedResponse;
        } else {
          resp = await f();
          cache.set(cacheKey, resp);
        }
      } else {
        resp = await f();
      }
      return Promise.resolve(resp);
    } catch (err) {
      const { payload } = err || {};
      if (payload?.errorCode === 421 || payload?.errorCode === '421') {
        console.log(payload, 'payload..')
      }
      return Promise.reject(err);
    }
  };
  return [apiCaller, clearMemoizedFunction];
};
