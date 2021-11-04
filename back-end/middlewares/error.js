/* eslint-disable consistent-return */
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err.code) {
    const { code, message } = err;
    return res.status(code).json({ error: { message } });
  }
  if (err.error.isJoi || err.error) {
    return res.status(400).json({ error: { message: err.error.details[0].message } });
  }
};
