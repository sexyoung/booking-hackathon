import { parse } from 'query-string';
/**
 * [isFBAlbumURL]
 * @param  {string}  url
 * @return {string}  [page || person]
 */
export function isFBAlbumURL(url) {
  const pageAlbumRegex = /http(s)?:\/\/(www|business|m)\.facebook\.com\/.+album_id=\d+.+/;
  const personAlbumRegex = /http(s)?:\/\/(www|business|m)\.facebook\.com\/.+\/media_set\?set=a\.\d+\.\d+\.\d+&type=\d+/;
  return pageAlbumRegex.test(url) ? 'page' :
           personAlbumRegex.test(url) ? 'person' :
           false;
}

export function getAlbumID(url, type) {
  const params = parse(new URL(url).search);
  if (type === 'page') {
    return params.album_id;
  } else if (type === 'person') {
    const albumParams = params.set.split('.');
    return albumParams[1];
  }
  return false;
}

export default {
  isFBAlbumURL,
  getAlbumID,
};
