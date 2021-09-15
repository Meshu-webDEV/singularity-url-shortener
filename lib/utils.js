const { nanoid } = require('nanoid');
const { WEB_SERVER } = require('./configs');
const { errorMessages } = require('./constants');

function createUniqueId(size = 21) {
  return new Promise(async (resolve, reject) => {
    try {
      const uniqueId = await nanoid(size);
      resolve(uniqueId);
    } catch (error) {
      console.log(error);
      reject('Error creating a unique ID');
    }
  });
}

function normalize(string = '') {
  return string.toString().replace(/ /g, '').toLowerCase();
}

function shortenUrl(uniqueid) {
  if (!uniqueid) throw new Error(errorMessages.INTERNAL);
  return `${WEB_SERVER.ORIGIN}/${uniqueid}`;
}

module.exports = {
  createUniqueId,
  normalize,
  shortenUrl,
};
