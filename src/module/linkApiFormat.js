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
  const queryString = listQuery
    .map(query => objectToQueryString(query))
    .join('&');
  return `${validatedLink}?${queryString}`;
};

export const formatJSON = data => {
  try {
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error formatting JSON:', error);
    return 'Error formatting JSON';
  }
};

export default {getApiUrl, formatJSON};
