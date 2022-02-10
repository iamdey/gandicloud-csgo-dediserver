import { ConfigPayload } from './types';

export const getConfig = async (): Promise<ConfigPayload> => {
  const response = await fetch('/api/config');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
