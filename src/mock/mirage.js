import { Server } from 'miragejs';
import { mockDataBase } from './seeds';
import { popularJobsRequestHandler, userDataRequestHandler } from './req-handlers/dashboard';

function mockServer(environment = 'development', callback) {
  return new Server({
    environment,
    seeds(server) {
      server.db.loadData(mockDataBase);
      callback();
    },
    routes() {
      this.get('/user-data', userDataRequestHandler);
      this.get('/popularJobs', popularJobsRequestHandler);
    }
  });
}
export default mockServer;
