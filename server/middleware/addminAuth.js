const addminAuth = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.addmin) return next();
  }

  res.sendStatus(401);
};
export default addminAuth;
