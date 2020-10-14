const jwt = require('jsonwebtoken')

function authenticateToken(req,res,next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                return res.status(401).json({
                    success: false,
                    messeage: 'Token is not valid'
                })
            } else {
                req.decoded = decoded;
                next()
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        })
    }  
}

module.exports = authenticateToken