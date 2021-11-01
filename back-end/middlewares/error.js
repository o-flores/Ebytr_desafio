// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err.error || err.error.isJoi) {
    return res.status(400).json({ error: { message: err.error.details[0].message } });
  }
  const { code, message } = err;
  return res.status(code).json({ error: { message } });
};
