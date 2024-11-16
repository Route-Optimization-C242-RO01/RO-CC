//list logic controller
const { where } = require('sequelize');
const { User } = require('../models');


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

module.exports = {testingUser}