export const extractIdFromUrl = (url: string): string => {
  const match = url.match(/\/(\d+)\/$/);
  return match ? match[1] : Math.random().toString(36).substring(2, 15);
};
