export const getImageParameters = (options = {}) => {
  const params = Object.entries(options)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return params ? `&${params}` : '';
};
