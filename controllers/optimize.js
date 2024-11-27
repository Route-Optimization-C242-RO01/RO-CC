const axios = require('axios')
const {Results, Route, Detail_route} = require('../models')
const { v4: uuidv4 } = require('uuid');

//optimasi rute
const optimize = async (req, res) => {
    try {
        //inputan user
        const { title, Number_of_vehicles, status, data } = req.body;

        //validasi inputan
        if (!data || !title || !Number_of_vehicles || !status) {
            return res.status(400).json({code:400, success: false, message: 'Please complete your data' });
        }

        //validasi user aktif
        if (!req.user || !req.user.id_user) {
            return res.status(401).json({code:401, success: false, message: 'Unauthorized: User not authenticated' });
        }

        //cek judul apakah sudah ada atau belum
        const findTitle = await Results.findOne({where:{title: title}})
        if (findTitle) {
            return res.status(400).json({code: 400, success: false, message: 'Title has been used'})
        }

        //mengambil data json untuk python API
        const payload = {
            data,
            Number_of_vehicles,
        };

        //akses API python
        const response = await axios.post(`${process.env.URL_MODEL}/api/Solution`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const results = response.data;

        // Validasi respons API Python
        if (!results || !results.Hasil) {
            throw new Error('Invalid response from Python API: "Hasil" is missing');
        }

        //simpan data ke database
        const transaction = await Results.sequelize.transaction();

        try {
            //tambah data results
            const dataResult = await Results.create({
                id_results: uuidv4(),
                id_user: req.user.id_user,
                title,
                number_of_vehicles: Number_of_vehicles,
                status,
            }, { transaction });

            const dataRoute = results.Hasil;
            //tambah data rute dan detail rute dari hasil API python

            for (const [vehicles, route] of Object.entries(dataRoute)) {

                //jika kendaraan tidak ada rute
                if (!route || route.length === 0) {
                    continue; // Lewati kendaraan 
                }

                const addRoute = await Route.create({
                    id_route: uuidv4(),
                    id_results: dataResult.id_results,
                }, { transaction });

                for (const detailRoute of route) {
                    if (!detailRoute.street || !detailRoute.latitude || !detailRoute.longitude) {
                        continue; 
                    }

                    await Detail_route.create({
                        id_detail_route: uuidv4(),
                        id_route: addRoute.id_route,
                        street: detailRoute.street,
                        city: detailRoute.city,
                        province: detailRoute.province,
                        postal_code: detailRoute.postal_code || null,
                        kg: detailRoute.kg || null,
                        latitude: detailRoute.latitude,
                        longitude: detailRoute.longitude,
                    }, { transaction });
                }
            }

            await transaction.commit();

            const dataSaved = await Results.findOne({
                where:{
                    id_results: dataResult.id_results
                },
                include: [
                    {
                        model: Route,
                        as: 'data_route_results',
                        attributes: ['id_results', 'id_route'],
                        include: [
                            {
                                model: Detail_route,
                                as: 'data_detailRoute_route',
                                attributes: ['id_detail_route', 'id_route', 'street', 'city', 'province', 'postal_code', 'kg', 'longitude', 'latitude']
                            }
                        ]
                    }
                ],
                attributes: ['id_results', 'title', 'number_of_vehicles', 'status']
            })

            if (dataSaved) {
                return res.status(200).json({code:200, success: true, message: 'Optimize Route Success', data: dataSaved})
            }
            return res.status(400).json({code: 400, success: false, message: 'Data not available'})
        } catch (error) {
            //jika tidak berhasil
            await transaction.rollback();
            console.error('Database Error:', error.message);
            return res.status(500).json({code:500, success: false, message: 'Error saving data to the database' });
        }
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({code:500, success: false, message: 'Server Error' });
    }
};

module.exports = { optimize };

