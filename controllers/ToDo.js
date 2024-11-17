const {Results, Destination, Detail_results, Detail_destination} = require('../models')

//add destination
//list destination unfinished
const getAllUnFinish = async (req,res) => {
    try {
        const id_user = req.user.id_user
        const getAll = await Results.findAll({
            where:{
                status: 'unfinished',
            },
            include: [
                {
                    model: Destination,
                    as: 'data_destination_results',
                    where:{
                        id_user: id_user
                    },
                    include: [
                        {
                            model: Detail_destination,
                            as: 'data_detail_destination',
                            attributes: ['id_detail_destination', 'id_destination', 'street', 'city', 'province', 'postal_code', 'kg']
                        }
                    ],
                    attributes: ['id_destination']
                },
                {
                    model: Detail_results,
                    as: 'data_detail_results',
                    attributes: ['id_detail_results', 'longitude', 'latitude']
                }
            ],
            attributes: ['id_results', 'status']
        })
        if (getAll.length > 0) {
            return res.status(200).json({success: true, message: 'Data available', data: getAll})
        }
        return res.status(400).json({success: false, message: 'Data not available'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: 'Server Error'})
    }
}

//update destination to finished
//list destination finished

module.exports = {getAllUnFinish}