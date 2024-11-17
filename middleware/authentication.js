const {Token_user} = require('../models')
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {    
    try {
        const authHeader = req.get('Authorization');
    
        if (!authHeader) {
            res.status(404).json({
                success: false,
                message: 'Enter the token first'
            })
        }

        const token = authHeader.split(' ')[1];
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ success: false, message: err });
            }

            const findToken = await Token_user.findOne({where: {token}})
            if (!findToken) {
                return res.status(401).json({ success: false, message: "There is no token or have logged out previously" });
            }

            const date = new Date()
            const tanggal = date.getDate()
            if (tanggal > findToken.expires_at) {
                return res.status(400).json({success: false, message: 'Token Has Expired'})
            } else {
                req.user = user;
                next();
            }
        });
        
    } catch (error) {
        console.error(error)
        res.status(404).json({
            success: false,
            message: 'Session Token Has Expired'
        })
    }
};

module.exports = {verifyToken}