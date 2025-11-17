const db = require("../config/db");

class DonHangController {
    taoDonHang(req, res, next) {
        const {idmanguoidung, trangthai, thanhtoan, tongtien, tienShip, tongsanpham, ngay, diachi, ghichu} = req.body;
        const query = "INSERT INTO donhang (idmanguoidung, trangthai, thanhtoan, tongtien, tienShip, tongsanpham, ngay, diachi, ghichu) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
        const values = [idmanguoidung, trangthai, thanhtoan, tongtien, tienShip, tongsanpham, ngay, diachi, ghichu]
        db.query(query, values, (error, result, field) => {
            if(error) {
                return res.status(400).json({
                    error: error
                })
            } else {
                return res.status(200).json({
                    message: "Thanh toán thành công",
                    id: result.insertId
                })
            }
        });
    }

    layDanhSach(req, res, next) {
        const query = "SELECT * from donhang"
        db.query(query, (error, result, field) => {
            if(error) {
                return res.status(400).json({
                    error: error
                })
            } else {
                return res.status(200).json({
                    message: "Lấy danh sách thành công",
                    dsDonHang: result
                })
            }
        }); 
    }

    layDanhSachTheoId(req, res, next) {
        const {idmanguoidung} = req.body
        const query = "SELECT * from donhang where idmanguoidung=?"
        const values = [idmanguoidung]
        db.query(query, values, (error, result, field) => {
            if(error) {
                return res.status(400).json({
                    error: error
                })
            } else {
                return res.status(200).json({
                    message: "Lấy danh sách thành công",
                    dsDonHang: result
                })
            }
        }); 
    }

    layTongSoTienVaDonHangTheoThang(req, res, next) {
        const {month, year} = req.query;
        const query = `SELECT 
                            SUM(tongtien) AS tong_tien,
                            COUNT(*) AS tong_donhang
                        FROM donhang
                        WHERE MONTH(STR_TO_DATE(ngay, '%H:%i:%s - %d/%m/%Y')) = ?
                        AND YEAR(STR_TO_DATE(ngay, '%H:%i:%s - %d/%m/%Y')) = ?`;
        const values = [month, year]
        db.query(query, values, (error, result, field) => {
            if(error) {
                return res.status(400).json({
                    error: error
                })
            } else {
                return res.status(200).json({
                    message: "Lấy danh sách thành công",
                    dsDonHang: result
                })
            }
        }); 
    }

    capNhatDonHang(req, res, next) {
        const {id, trangthai, ghichu} = req.body
        const query = "UPDATE donhang SET trangthai=?, ghichu=? where id=?"
        const values = [trangthai, ghichu, id]
        db.query(query, values, (error, result, field) => {
            if(error) {
                return res.status(400).json({
                    error: error
                })
            } else {
                return res.status(200).json({
                    message: "Sửa thành công thành công",
                    donHang: true
                })
            }
        });
    }
}

module.exports = new DonHangController()
