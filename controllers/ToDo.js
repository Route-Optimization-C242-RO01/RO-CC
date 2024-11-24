const {
  Results,Route, Detail_route,
} = require("../models");

//list destination unfinished
const getAllUnFinish = async (req,res) => {
  try {

    //ambil id user yang sedang aktif
    const id_user = req.user.id_user
    
    //cari seluruh data yang status = unfinished dan sesuai user
    const getAll = await Results.findAll({
      where: {
        status: 'unfinished',
        id_user: id_user
      },
      include: [
        {
          model: Route,
          as: 'data_route_results',
          attributes: ['id_results','id_route'],
          include: [
            {
              model: Detail_route,
              as: 'data_detailRoute_route',
              attributes: ['id_detail_route', 'id_route', 'street', 'city', 'province','postal_code', 'kg', 'longitude', 'latitude']
            }
          ]
        }
      ],
      attributes: ['id_results', 'title', 'number_of_vehicles', 'status']
    })

    //jika data ada
    if (getAll.length > 0) {
      return res.status(200).json({success: true, message: 'Data Available', data: getAll})
    }

    //jika data tidak ada
    return res.status(400).json({success: false, message: 'Data Not Available'})
  } catch (error) {
    console.log(error)
    return res.status(500).json({success: false, message: 'Kesalahan Server'})
  }
}


//update destination to finished
const updateToFinished = async (req, res) => {
  try {
    const { id_results } = req.params;
    const id_user = req.user.id_user;

    // Cek apakah results ada dan milik user yang sedang login
    const existingResult = await Results.findOne({
      where: {
        id_results: id_results,
      },
      include: [
        {
          model: Destination,
          as: "data_destination_results",
          where: {
            id_user: id_user,
          },
        },
      ],
    });

    // Jika results tidak ditemukan
    if (!existingResult) {
      return res.status(404).json({
        success: false,
        message: "Results not found or you don't have permission",
      });
    }

    // Jika status sudah finished
    if (existingResult.status === "finished") {
      return res.status(400).json({
        success: false,
        message: "Results is already finished",
      });
    }

    // Update status menjadi finished
    const updatedResult = await Results.update(
      { status: "finished" },
      {
        where: {
          id_results: id_results,
        },
      }
    );

    // Cek apakah update berhasil
    if (updatedResult) {
      return res.status(200).json({
        success: true,
        message: "Results updated to finished successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to update results",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//list destination finished
const getfinishhistory = async (req, res) => {
  try {
    //ambil id user yang aktif (login)
    const id_user = req.user.id_user;

    //mengambil semua data hasil rute yang berstatus finished
    const getFinished = await Results.findAll({
      where: {
        status: "finished",
      },
      include: [
        {
          model: Destination,
          as: "data_destination_results",
          where: {
            id_user: id_user,
          },
          include: [
            {
              model: Detail_destination,
              as: "data_detail_destination",
              attributes: [
                "id_detail_destination",
                "id_destination",
                "street",
                "city",
                "province",
                "postal_code",
                "kg",
              ],
            },
          ],
          attributes: ["id_destination"],
        },
        {
          model: Detail_results,
          as: "data_detail_results",
          attributes: ["id_detail_results", "longitude", "latitude"],
        },
      ],
      attributes: ["id_results", "status"],
      order: [["updatedAt", "DESC"]], // Optional: sort by latest finished first
    });

    // jika data ada
    if (getFinished.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Finished destinations found",
        data: getFinished,
      });
    }

    //jika data tidak ada
    return res.status(400).json({
      success: false,
      message: "No finished destinations found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { getAllUnFinish, updateToFinished, getfinishhistory };
