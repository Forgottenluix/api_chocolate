const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const jwtVerify = async (req, res, next) => {
  const { authorization: authHeader } = req.headers;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token JWT não foi enviado' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res
      .status(401)
      .json({ error: 'Valor enviado não está com duas partes' });
  }

  const [scheme, token] = parts;

  if (!scheme === 'Bearer') {
    return res.status(401).json({ error: 'Primeira parte inválida' });
  }

  try {
    const tokenDecoded = await promisify(jwt.verify)(token, 'aaaaaa');
    req.userId = tokenDecoded.id;

    return next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ error: 'Token JWT inválido' });
  }
};

module.exports = jwtVerify;
