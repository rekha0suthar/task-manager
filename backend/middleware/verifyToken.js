import jwt from 'jsonwebtoken';
import config from 'config';

export const verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send('Unauthorized');
  }
};
