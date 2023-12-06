const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = (req, res, next) => {
   try {
       const authorizationHeader = req.headers.authorization;
       
       if (!authorizationHeader) {
           throw new Error('Token non fourni');
       }

       const token = authorizationHeader.split(' ')[1];
       const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
       next();
   } catch(error) {
       console.error(error);
       res.status(401).json({ message: 'Authentification échouée' });
   }
};
