const jwt = require('jsonwebtoken')

// Middleware private route function.
// Checks if a user have a given token
// The token gets assined to the user when logged in
 module.exports = function (req, res, next){
    const token = req.header('auth-token')
    if(!token) res.status(401).send('Access denied')

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
    } catch(err){
        res.status(400).send('Invalid Token')
    }
}