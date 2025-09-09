const db = require("../config/db");

class BanController {
    taoBan(req, res, next) {
        const { vitri, soluong } = req.body
        const query = "INSERT INTO ban (vitri, trangthai, soluong) VALUES (?, ?, ?)"
        const values = [vitri, 0, soluong]
    }

    layBanTheoViTri(req, res, next) {
        const { vitri } = req.body
        const query = "SELECT * from ban where vitri=?"
        const values = [vitri]
        db.query(query, values, (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            }
            return res.status(200).json({
                message: "lay ban thanh cong",
                ban: result[0]
            })
        })
    }

    layDsBan(req, res, next) {
        const query = "SELECT * from ban"
        db.query(query, (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            }
            return res.status(200).json({
                message: "lay danh sach ban thanh cong",
                dsBan: result
            })
        })
    }

    capNhatTrangThaiBanTheoId(req, res, next) {
        const { id, trangthai } = req.body;
        const query = "UPDATE ban SET trangthai = ? WHERE id = ?";
        const values = [trangthai, id]
        db.query(query, values, (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            }
            return res.status(200).json({
                message: "Cập nhật trạng thái bàn thành công",
                updateSuccess: true
            })
        })
    }

    themBan(req, res, next) {
        const { vitri, soluong } = req.body
        const checkVitri = /[~`!@#$%^&*()_\-+={}\[\]|\\:;"'<>,.?/]/.test(vitri);
        const checkSoluong = /^[0-9]+$/.test(soluong);

        if (checkVitri) {
            return res.status(200).json({
                inputInvalid: "vitri",
                messageInvalid: "Vị trí bàn không hợp lệ"
            })
        }
        else if (!checkSoluong) {
            return res.status(200).json({
                inputInvalid: "soluong",
                messageInvalid: "Số lượng chỗ ngồi không hợp lệ"
            })
        }


        const queryCheckVitri = "SELECT * FROM ban WHERE vitri = ?";
        db.query(queryCheckVitri, [vitri], (error, results) => {
            if (results.length > 0) {
                return res.status(200).json({
                    inputInvalid: "vitri",
                    messageInvalid: "Vị trí bàn đã tồn tại"
                });
            }
            const query = "INSERT INTO ban (vitri, soluong, trangthai) VALUES (?, ?, ?)";
            const values = [vitri, soluong, '0'];

            db.query(query, values, (error, result, field) => {
                if (error) {
                    return res.status(400).json({
                        error: error
                    })
                } else {
                    return res.status(200).json({
                        message: "Thêm bàn thành công",
                        ban: result.insertId
                    })
                }
            });
        });
    }

    xoaBan(req, res, next) {
        const { id } = req.body;
        const query = "DELETE FROM ban where id=?";
        const values = [id];

        db.query(query, values, (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            } else {
                return res.status(200).json({
                    message: "Xóa bàn thành công",
                    deleteSuccess: true
                })
            }
        })
    }


}

module.exports = new BanController()
