const User = require('../models/user');

module.exports = async (req, res, next) => {
    const reqToken = await req.get('Authorization');

    if(!reqToken) return res.status(401).send({error: 'Unauthorized'});

    const [type, token] = reqToken.split(' ');

    const user = await User.findOne({token});

    if(type !== 'Token' || !user) return res.status(401).send({error: 'Unauthorized'});

    req.token = token;
    req.user = user;
    next();
};