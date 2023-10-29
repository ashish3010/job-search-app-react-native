import { MOCK_MODE } from "@env"

function loadMockServerOnce() {
  let initializeMockServer = true;
  const channel = {};
  channel.waitOn = new Promise((resolve, reject) => {
    channel.resolve = resolve;
    channel.reject = reject;
  });
  return async () => {
    if (initializeMockServer) {
      if (MOCK_MODE === 'y') {
        const { default: mockServer } = await import('./mirage');
        await mockServer('development', channel.resolve);
        initializeMockServer = false;
      } else {
        channel.resolve();
      }
    }
    return channel.waitOn;
  };
}

export const loadMockServer = loadMockServerOnce();
