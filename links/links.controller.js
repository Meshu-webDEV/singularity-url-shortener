const { WEB_SERVER } = require('../lib/configs');
const { errorMessages } = require('../lib/constants');
const { createUniqueId, shortenUrl } = require('../lib/utils');
// const Team = require('./team.model');
const Link = require('./links.model');

function getLinkByUniqueid(uniqueid, redirect = false) {
  return new Promise(async (resolve, reject) => {
    //
    try {
      if (!redirect) {
        const link = await Link.findOne(
          { uniqueid: uniqueid, deleted: false },
          {
            '__v': 0,
            '_id': 0,
            'deleted': 0,
          }
        );

        if (!link) return reject(new Error(errorMessages.NOT_FOUND));

        return resolve(link);
      }

      if (redirect) {
        const link = await Link.findOneAndUpdate(
          { uniqueid: uniqueid, deleted: false },
          {
            $inc: {
              clicks: 1,
            },
          },
          {
            projection: {
              '__v': 0,
              '_id': 0,
              'deleted': 0,
            },
            new: true,
          }
        );

        if (!link) return reject(new Error(errorMessages.NOT_FOUND));

        return resolve(link);
      }
    } catch (error) {
      console.log(error);
      return reject(new Error(errorMessages.INTERNAL));
    }
  });
}

function shorten(url) {
  return new Promise(async (resolve, reject) => {
    //

    const uniqueid = await createUniqueId(6);

    const link = {
      uniqueid: uniqueid,
      original: url,
      shortened: shortenUrl(uniqueid),
    };

    try {
      const createdLink = await new Link(link).save();

      return resolve({
        'original': createdLink.original,
        'shortened': createdLink.shortened,
        'uniqueid': createdLink.uniqueid,
        'clicks': createdLink.clicks,
      });
    } catch (error) {
      console.log(error);
      return reject(new Error(errorMessages.INTERNAL));
    }
  });
}

module.exports = {
  shorten,
  getLinkByUniqueid,
};
