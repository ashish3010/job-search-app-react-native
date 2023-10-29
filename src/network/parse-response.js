import parseLinkHeader from 'parse-link-header';

const lblCommonErrorMsg = 'Something went wrong'
const apiErrorDefaultMsg = 'Something went wrong. Please try again'

const buildError = (payload, res) => {
  const error = new Error(payload.message || lblCommonErrorMsg);
  error.statusCode = res.status;
  error.status = payload.status;
  error.errorCode = payload.errorCode;
  error.errorMsg = payload.message || payload.errorMessage || payload.errorMsg || apiErrorDefaultMsg;
  error.payload = payload;
  return error;
};

const parseBody = async res => {
  if (res.type === 'cors') {
    return res.json();
  }
  switch (res.headers.get('content-type')?.split(';')[0]) {
    case 'application/json': {
      const body = await res.json();
      if (body?.status !== true) {
        throw buildError(body, res);
      }
      return body;
    }
    case 'text/plain': return res.text();
    default: return res.blob();
  }
};

const handleError = async res => {
  const body = await parseBody(res);
  throw buildError(body, res);
};

const pagination = res => {
  const linkHeader = parseLinkHeader(res.headers.get('link'));

  if (!linkHeader) return {};

  return Object.values(linkHeader).reduce(
    (acc, { rel, url }) => ({
      ...acc,
      [rel]: () => fetch(url)
    }),
    {}
  );
};

export default async res => {
  console.log(JSON.stringify(res), 'res...........');
  if (!res.ok) return handleError(res);
  return {
    headers: res.headers,
    data: await parseBody(res),
    ...pagination(res)
  };
};
