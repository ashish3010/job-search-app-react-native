import { get } from '../../network';
import { apiCallHandler } from '../../utils/curries';

export const getUserData = async () => {
  let response = {};
  try {
    const apiPath = '/user-data';
    response = await get(apiPath);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getPopularJobs = async () => {
  let response = {};
  try {
    const apiPath = '/popularJobs';
    response = await get(apiPath);
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};


const [srGetPopularJobs] = apiCallHandler(getPopularJobs, true, 'getPopularJobs');
const [srGetUserData] = apiCallHandler(getUserData, true, 'getUserData');

export { srGetUserData, srGetPopularJobs };