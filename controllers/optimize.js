const axios = require('axios');
const { Results, Route, Detail_route } = require('../models');
const { v4: uuidv4 } = require('uuid');

// Optimasi rute
const optimize = async (req, res) => {
    try {
        // Input dari user
        const { title, Number_of_vehicles, status, data } = req.body;

        // Validasi input
        if (!data || !title || !Number_of_vehicles || !status) {
            return res.status(400).json({ code: 400, success: false, message: 'Please complete your data' });
        }

        // Validasi user aktif
        if (!req.user || !req.user.id_user) {
            return res.status(401).json({ code: 401, success: false, message: 'Unauthorized: User not authenticated' });
        }

        // Cek judul apakah sudah ada
        const findTitle = await Results.findOne({ where: { title: title } });
        if (findTitle) {
            return res.status(400).json({ code: 400, success: false, message: 'Title has been used' });
        }

        // Persiapkan payload untuk Python API
        const payload = {
            data,
            Number_of_vehicles,
        };

        // Panggil API Python
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

        // Simpan data ke database
        const transaction = await Results.sequelize.transaction();

        try {
            // Tambah data results
            const dataResult = await Results.create({
                id_results: uuidv4(),
                id_user: req.user.id_user,
                title,
                number_of_vehicles: Number_of_vehicles,
                total_distance: results.Total_Jarak_Ditempuh,
                status,
            }, { transaction });

            const dataRoute = results.Hasil;

            // Urutkan kendaraan berdasarkan nama
            const vehicleKeys = Object.keys(dataRoute).sort();

            for (const [vehicleIndex, vehicle] of vehicleKeys.entries()) {
                const route = dataRoute[vehicle];

                // Jika kendaraan tidak ada rute
                if (!route || route.length === 0) {
                    continue; // Lewati kendaraan
                }

                // Tambah data rute
                const addRoute = await Route.create({
                    id_route: uuidv4(),
                    id_results: dataResult.id_results,
                    vehicle_sequence: vehicleIndex, 
                }, { transaction });

                // Tambah detail rute
                for (const [index, detailRoute] of route.entries()) {
                    if (!detailRoute.street || !detailRoute.latitude || !detailRoute.longitude) {
                        continue; // Lewati jika data tidak lengkap
                    }

                    await Detail_route.create({
                        id_detail_route: uuidv4(),
                        id_route: addRoute.id_route,
                        street: detailRoute.street,
                        demand: detailRoute.demand,
                        city: detailRoute.city,
                        province: detailRoute.province,
                        postal_code: detailRoute.postal_code || null,
                        latitude: detailRoute.latitude,
                        longitude: detailRoute.longitude,
                        sequence: index, 
                    }, { transaction });
                }
            }

            await transaction.commit();

            // Ambil data yang telah disimpan untuk respon
            const dataSaved = await Results.findOne({
                where: { id_results: dataResult.id_results },
                include: [
                    {
                        model: Route,
                        as: 'data_route_results',
                        attributes: ['id_results', 'id_route', 'vehicle_sequence'],
                        include: [
                            {
                                model: Detail_route,
                                as: 'data_detailRoute_route',
                                attributes: [
                                    'id_detail_route', 'id_route', 'street', 'city', 'province', 
                                    'postal_code', 'longitude', 'latitude', 'demand', 'sequence'
                                ],
                            }
                        ],
                    }
                ],
                attributes: ['id_results', 'title', 'number_of_vehicles', 'status', 'total_distance'],
                order: [
                    ["updatedAt", "DESC"], 
                    [{ model: Route, as: "data_route_results" }, "vehicle_sequence", "ASC"], 
                    [{ model: Route, as: "data_route_results" }, { model: Detail_route, as: "data_detailRoute_route" }, "sequence", "ASC"],
                ],
            });
            if (dataSaved) {
                return res.status(200).json({
                    code: 200,
                    success: true,
                    message: 'Optimize Route Success',
                    data: dataSaved,
                });
            }

            return res.status(400).json({ code: 400, success: false, message: 'Data not available' });
        } catch (error) {
            // Rollback jika ada error
            await transaction.rollback();
            console.error('Database Error:', error.message);
            return res.status(500).json({ code: 500, success: false, message: 'Error saving data to the database' });
        }
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ code: 500, success: false, message: 'Server Error' });
    }
};

module.exports = { optimize };