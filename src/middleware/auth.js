const jwt = require('jsonwebtoken');
const Secret_Key = process.env.SECRET_KEY;

const auth = (req,res,next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(' ')[1];

            console.log('SECRET_KEY:', process.env.SECRET_KEY);
let user = jwt.verify(token, process.env.SECRET_KEY);

          //  let user = jwt.verify(token,Secret_Key);
            req.userId  = user.id;
        }else{
            return res.status(401).json({message: 'Unauthorised user try'});
        }
        next();
    } catch (error) {
        console.log('Error:', error);
        res.status(401).json({message: 'Unauthorised user catch'});
    }
}
module.exports = auth;