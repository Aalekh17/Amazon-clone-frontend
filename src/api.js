const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getApiUrl = (path = '') => {
  const normalizedBase = API_BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (/^https?:\/\//i.test(imagePath)) return imagePath;
  // If imagePath looks like a file ID (MongoDB ObjectId format), use the image endpoint
  if (/^[a-f0-9]{24}$/.test(imagePath)) {
    return getApiUrl(`/image/${imagePath}`);
  }
  // Otherwise, treat it as a path
  return getApiUrl(imagePath);
};

export default getApiUrl;
