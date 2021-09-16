const { errorMessages } = require('../lib/constants');
const { shorten, getLinkByUniqueid } = require('./links.controller');

const router = require('express').Router();

// Controllers

// GET ../links
router.get('/:id', async (req, res, next) => {
  try {
    const link = await getLinkByUniqueid(req.params.idm, false);
    console.log(link);
    res.json({ link: link });
  } catch (error) {
    return next(error);
  }
});

// POST ../links/new
router.post('/new', async (req, res, next) => {
  try {
    const link = await shorten(req.body.url);
    return res.json({ link: link });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;
