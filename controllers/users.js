
const { User, sequelize } = require('../models');

//testing
const testingUser = async (req,res) => {
    const find = await User.findOne({
        where: {
            name: 'nadini'
        }
    })
    if (!find) {
        return res.status(400).json({success: false, message: 'Tidak ada data'})
    }
    return res.status(200).json({success: true, message: 'Data ada'})
}

//register
const register = async (req,res) => {
    try {
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Server Error'})
    }
}
//login
//logout


module.exports = {testingUser}