const { url } = require('@config/app');

const handle = (err, req, res, next) => {
  switch (err.constructor) {
    default:
      console.log(err);
      return res.error(err, 500);
  }
};

module.exports = {
  handle,
};
