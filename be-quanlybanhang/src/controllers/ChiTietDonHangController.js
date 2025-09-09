const db = require("../config/db");

class ChiTietDonHangController {
    taoChiTiet(req, res, next) {
        const {	iddonhang , idsanpham , soluong } = req.body
        const query = "INSERT INTO chitietdonhang (iddonhang, idsanpham, soluong) VALUES (?, ?, ?)"
        const values = [iddonhang, idsanpham, soluong]
        db.query(query, values, (error, result, field) => {
            if(error) {
                return res.status(400).json({
                    error: error
                })
            } else {
                return res.status(200).json({
                    message: "Tạo chi tiết thành công",
                    chiTiet: true
                })
            }
        });
    }

    layChiTietTheoDon(req, res, next) {
        const {iddonhang} = req.body
        const query = "SELECT * from chitietdonhang where iddonhang=?"
        const values = [iddonhang]
        db.query(query, values, (error, result, field) => {
            if(error) {
                return res.status(400).json({
                    error: error
                })
            } else {
                return res.status(200).json({
                    message: "Lấy danh sách thành công",
                    dsChiTiet: result
                })
            }
        }); 
    }
}

module.exports = new ChiTietDonHangController()
