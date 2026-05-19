const BASE_URL =
  'http://192.168.43.134:4000';

export const getImageUrl = (
  url?: string
) => {
  if (!url) {
    return 'https://via.placeholder.com/400';
  }

  // Already full URL
  if (
    url.startsWith('http')
  ) {
    return url;
  }

  // Local uploaded files
  if (
    url.startsWith('/uploads')
  ) {
    return `${BASE_URL}${url}`;
  }

  return url;
};