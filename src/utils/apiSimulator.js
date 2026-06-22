import { mockDatabase } from '../data/portfolio';

export const simulateFetch = async (endpoint) => {
  return new Promise((resolve, reject) => {
    // Simulate network latency (300ms - 800ms)
    const delay = Math.floor(Math.random() * 500) + 300;
    setTimeout(() => {
      if (mockDatabase[endpoint]) {
        resolve(mockDatabase[endpoint]);
      } else {
        reject({ status: 404, message: "Endpoint not found" });
      }
    }, delay);
  });
};
