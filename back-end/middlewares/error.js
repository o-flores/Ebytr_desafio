// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const { code, message } = err;
  return res.status(code).json({ error: { message } });
};
