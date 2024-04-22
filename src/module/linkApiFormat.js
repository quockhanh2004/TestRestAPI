import {Clipboard} from 'react-native';

const objectToQueryString = obj => {
  const parts = [];

  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key]) {
      parts.push(`${encodeURIComponent(obj[key])}`);
    }
  }

  return parts.join('=');
};

const validateAndPrefixLink = linkValue => {
  // Check if link already has a protocol (http:// or https://)
  const hasProtocol = /^https?:\/\//i.test(linkValue);

  // If no protocol, prepend http://
  return hasProtocol ? linkValue : `http://${linkValue}`;
};

export const getApiUrl = (link, listQuery) => {
  const validatedLink = validateAndPrefixLink(link);
  console.log('listQuery >>> ' + listQuery.length);
  if (listQuery.length > 1 || listQuery[0].parameters !== '') {
    const queryString = listQuery
      .map(query => objectToQueryString(query))
      .join('&');
    console.log('run');
    return `${validatedLink}?${queryString}`;
  }
  return `${validatedLink}`;
};

export const formatJSON = data => {
  try {
    let res = JSON.stringify(data);
    console.log('response.length >>> ' + res.length);
    if (res.length > 56000) {
      console.log('hi');
      return res;
    }
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error formatting JSON:', error);
    return 'Error formatting JSON';
  }
};

export const copyToClipboard = output => {
  Clipboard.setString(output);
};

export default {getApiUrl, formatJSON, copyToClipboard};
