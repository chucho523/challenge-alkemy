const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authorization = req.get('authorization');
    let token = null;
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token= authorization.substring(7);
    }
    const decodedToken = jwt.verify(token, 'chucho523')

    if(!token || !decodedToken.id){
        return res.status(401).json({ error: 'token is mising or invalid'})
    }

    const {id: id_user} = decodedToken;
    req.id_user = id_user;

    next();
}