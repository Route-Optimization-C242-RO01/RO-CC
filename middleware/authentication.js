const {Token_user} = require('../models')
const jwt = require('jsonwebtoken')

//verifikasi token user
const verifyToken = (req, res, next) => {    
    try {
        //mengambil authorization
        const authHeader = req.get('Authorization');
    
        //jika tidak ada token
        if (!authHeader) {
            res.status(404).json({
                code:404,
                success: false,
                message: 'Enter the token first'
            })
        }

        //split data untuk hanya mengambil bagian token saja
        const token = authHeader.split(' ')[1];

        //verifikasi token jwt
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) {
                console.error(err);
                return res.status(401).json({code:401, success: false, message: err });
            }

            //validasi apakah token ada atau tidak pada database
            const findToken = await Token_user.findOne({where: {token}})
            //jika tidak ada
            if (!findToken) {
                return res.status(401).json({code:401, success: false, message: "There is no token or have logged out previously" });
            }

            //jika ada
            const date = new Date()
            const tanggal = date.getDate()
            if (tanggal > findToken.expires_at) {
                return res.status(400).json({code:400, success: false, message: 'Token Has Expired'})
            } else {
                req.user = user;
                next();
            }
        });
        
    } catch (error) {
        console.error(error)
        res.status(404).json({
            code:404,
            success: false,
            message: 'Session Token Has Expired'
        })
    }
};

module.exports = {verifyToken}