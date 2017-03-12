const baseURL = process.env.baseApiURL;
export const attractionsApiURL = () => `${baseURL}attractions`;
export const hotelsApiURL = () => `${baseURL}hotels`;

export default {
  attractionsApiURL,
  hotelsApiURL,
};
