const baseURL = process.env.baseApiURL;
export const attractionsApiURL = () => `${baseURL}attractions`;
export const hotelsApiURL = () => `${baseURL}hotels`;
export const heatsApiURL = () => `${baseURL}attractions/heatmap`;

export default {
  attractionsApiURL,
  hotelsApiURL,
  heatsApiURL,
};
