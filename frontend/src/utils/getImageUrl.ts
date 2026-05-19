export const getImageUrl = (
  url?: string
) => {
  if (!url) {
    return '';
  }

  // CLOUDINARY
  if (
    url.startsWith('http')
  ) {
    return url;
  }

  // LOCAL BACKEND IMAGE
  return `http://192.168.43.134:4000${url}`;
};