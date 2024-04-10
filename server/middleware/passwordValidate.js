export default function passwordValidate(req, resp, next) {
  if (req.body.password.length < 8) return resp.status(406).json('Slaptažodis yra per trumpas, slaptažodis negal būti trumpesnis nei 8 simboliai.')
  if (req.body.password.length > 80) return resp.status(406).json('Slaptažodis yra per ilgas, slaptažodis negal būti ilgesnis nei 88 simbolių.')
  if (!/[0-9]/.test(req.body.password)) return resp.status(406).json('Slaptažodis turi turėti bent vieną skaitmenį')
  if (!/[A-Z]/.test(req.body.password)) return resp.status(406).json('Slaptažodis turi turėti bent vieną didžiają raidę.')
  if (!/[a-z]/.test(req.body.password)) return resp.status(406).json('Slaptažodis turi turėti bent vieną mažają raidę.')
  if (!/[#?!@$ %^&*-.+=]/.test(req.body.password)) return resp.status(406).json('Slaptažodis turi turėti bent viena simbolį.')
  return next()
}
