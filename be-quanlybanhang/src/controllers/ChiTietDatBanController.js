const db = require("../config/db");

class ChiTietDatBanController {
    taoChiTiet(req, res, next) {
        const { idmanguoidung, idban, ngaygio, trangthai } = req.body;
        const query = "INSERT INTO chitietdatban (idmanguoidung , idban, ngaygio, trangthai) VALUES (?, ?, ?, ?)"
        const values = [idmanguoidung, idban, ngaygio, trangthai];

        db.query(query, values, (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            }
            return res.status(200).json({
                message: "Đặt bàn thành công",
                dsChiTietDatBan: result,
                chiTietDatBan: true
            })
        })
    }

    layDsChiTietDatBanTheoIdMaNguoiDung(req, res, next) {
        const { idmanguoidung } = req.body
        const query = "SELECT * FROM chitietdatban where idmanguoidung=?"
        const values = [idmanguoidung]

        db.query(query, values, (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            }
            return res.status(200).json({
                dsChiTietDatBan: result
            })
        })
    }

    layDsChiTietDatBan(req, res, next) {
        const query = "SELECT * FROM chitietdatban";
        db.query(query, (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            }
            return res.status(200).json({
                updateSuccess: true,
                dsChiTietDatBan: result
            })
        })
    }

    layDsChiTietDatBanTrongHangCho(req, res, next) {
        const query = "SELECT * FROM chitietdatban where trangthai = '1' or trangthai = '4'";
        db.query(query, (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            }
            return res.status(200).json({
                dsChiTietDatBan: result
            })
        })
    }

    layViTriBanTheoIdBan(req, res, next) {
        const { idban } = req.body;
        const query = "SELECT vitri FROM ban where id = ?";
        console.log(">>> ", idban)
        db.query(query, [idban], (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            }
            return res.status(200).json({
                vitri: result.vitri
            })
        })
    }

    capNhatTrangThaiChiTietDatBan(req, res, next) {
        const { idmanguoidung, idban, trangthai } = req.body
        const query = "UPDATE chitietdatban SET trangthai = ? where idmanguoidung = ? and idban = ?"
        const values = [trangthai, idmanguoidung, idban];
        db.query(query, values, (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            }
            return res.status(200).json({
                dsChiTietDatBan: result
            })
        })
    }
}

module.exports = new ChiTietDatBanController()
