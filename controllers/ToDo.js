const { Results, Route, Detail_route } = require("../models");

//list destination unfinished
const getAllUnFinish = async (req, res) => {
  try {
    //get user yang aktif
    const id_user = req.user.id_user

    //cari semua data result yang status unfinished berdasar user
    const getAll = await Results.findAll({
      where: {
        status: "unfinished",
        id_user: id_user,
      },
      include: [
        {
          model: Route,
          as: "data_route_results",
          attributes: ["id_results", "id_route"],
          include: [
            {
              model: Detail_route,
              as: "data_detailRoute_route",
              attributes: [
                "id_detail_route",
                "id_route",
                "street",
                "city",
                "province",
                "postal_code",
                "kg",
                "longitude",
                "latitude",
              ],
            },
          ],
        },
      ],
      attributes: ["id_results", "title", "number_of_vehicles", "status"],
      order: [["updatedAt", "DESC"]],
    });

    //jika data ada
    if (getAll.length > 0) {
      return res
        .status(200)
        .json({ success: true, message: "Data Available", data: getAll });
    }

    //jika data tidak ada
    return res.status(400).json({success: false, message: 'Data Not Available'})
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Kesalahan Server" });
  }
};

//update destination to finished
const updateToFinished = async (req, res) => {
  try {
    const { id_results } = req.params;
    const id_user = req.user.id_user;

    // Cek apakah results ada dan milik user yang sedang login
    const existingResult = await Results.findOne({
      where: {
        id_results: id_results,
        id_user: id_user,
        status: "unfinished",
      },
    });

    // Jika results tidak ditemukan
    if (!existingResult) {
      return res.status(404).json({
        success: false,
        message: "Results not found or you don't have permission",
      });
    }

    // update status
    const [updatedRows] = await Results.update(
      { status: "finished" },
      {
        where: {
          id_results: id_results,
          id_user: id_user,
        },
      }
    );

    if (updatedRows > 0) {
      return res.status(200).json({
        success: true,
        message: "Results has been updated to finished",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Failed to update results",
    });
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
        id_user: id_user,
      },
      include: [
        {
          model: Route,
          as: "data_route_results",
          attributes: ["id_results", "id_route"],
          include: [
            {
              model: Detail_route,
              as: "data_detailRoute_route",
              attributes: [
                "id_detail_route",
                "id_route",
                "street",
                "city",
                "province",
                "postal_code",
                "kg",
                "longitude",
                "latitude",
              ],
            },
          ],
        },
      ],
      attributes: ["id_results", "title", "number_of_vehicles", "status"],
      order: [["updatedAt", "DESC"]],
    });

    //jika data ditemukan
    if (getFinished.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Data Available",
        data: getFinished,
      });
    }

    //jika data tidak ditemukan
    return res.status(400).json({
      success: false,
      message: "Data Not Available",
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
