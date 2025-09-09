const db = require("../config/db");

class SanPhamController {
    laySanPhamTheoLoai(req, res, next) {
        const { idloaisanpham } = req.body;
        const query = "SELECT * FROM sanpham WHERE idloaisanpham=?";
        const values = [
            idloaisanpham
        ]
        db.query(query, values, (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            } else {
                return res.status(200).json({
                    message: "Lấy danh sách sản phẩm thành công",
                    dsSanPham: result
                })
            }
        })
    }

    laySanPhamTheoId(req, res, next) {
        const { id } = req.body;
        const query = "SELECT * FROM sanpham WHERE id=?";
        const values = [
            id
        ]
        db.query(query, values, (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            } else {
                return res.status(200).json({
                    message: "Lấy sản phẩm thành công",
                    sanPham: result[0]
                })
            }
        })
    }

    layDsSanPham(req, res, next) {
        const query = "SELECT * FROM sanpham"
        db.query(query, (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            } else {
                return res.status(200).json({
                    message: "Lấy danh sách sản phẩm thành công",
                    dsSanPham: result
                })
            }
        })
    }

    them(req, res, next) {
        const { idloaisanpham, ten, dongia, mota } = req.body
        const checkTenSanPham = /[~`!@#$%^&*()_\-+={}\[\]|\\:;"'<>,.?/]/.test(ten);
        const checkDonGia = /^[0-9]+$/.test(dongia);

        if (checkTenSanPham) {
            return res.status(200).json({
                inputInvalid: "ten",
                messageInvalid: "Tên sản phẩm không hợp lệ"
            })
        }
        else if (!checkDonGia) {
            return res.status(200).json({
                inputInvalid: "dongia",
                messageInvalid: "Đơn giá không hợp lệ"
            })
        }


        const queryCheckTenSanPham = "SELECT * FROM sanpham WHERE ten = ?";
        db.query(queryCheckTenSanPham, [ten], (error, results) => {
            if (results.length > 0) {
                return res.status(200).json({
                    inputInvalid: "ten",
                    messageInvalid: "Tên sản phẩm đã tồn tại"
                });
            }
            const query = "INSERT INTO sanpham (idloaisanpham, ten, dongia, mota) VALUES (?, ?, ?, ?)";
            const values = [idloaisanpham, ten, dongia, mota]

            db.query(query, values, (error, result, field) => {
                if (error) {
                    return res.status(400).json({
                        error: error
                    })
                } else {
                    return res.status(200).json({
                        message: "Thêm sản phẩm thành công",
                        sanPham: result.insertId
                    })
                }
            });
        });
    }

    sua(req, res, next) {
        const { idloaisanpham, ten, dongia, mota, id } = req.body
        const checkTenSanPham = /[~`!@#$%^&*()_\-+={}\[\]|\\:;"'<>,.?/]/.test(ten);
        const checkDonGia = /^[0-9]+$/.test(dongia);

        if (checkTenSanPham) {
            return res.status(200).json({
                inputInvalid: "ten",
                messageInvalid: "Tên sản phẩm không hợp lệ"
            })
        }
        else if (!checkDonGia) {
            return res.status(200).json({
                inputInvalid: "dongia",
                messageInvalid: "Đơn giá không hợp lệ"
            })
        }


        const queryCheckTenSanPham = "SELECT * FROM sanpham WHERE ten = ? and id != ?";
        db.query(queryCheckTenSanPham, [ten, id], (error, results) => {
            if (results.length > 0) {
                return res.status(200).json({
                    inputInvalid: "ten",
                    messageInvalid: "Tên sản phẩm đã tồn tại"
                });
            }
            const query = "UPDATE sanpham SET idloaisanpham=?, ten=?, dongia=?, mota=? where id=?";
            const values = [idloaisanpham, ten, dongia, mota, id]

            db.query(query, values, (error, result, field) => {
                if (error) {
                    return res.status(400).json({
                        error: error
                    })
                } else {
                    return res.status(200).json({
                        message: "Sửa sản phẩm thành công",
                        sanPham: true
                    })
                }
            });
        });
    }

    xoa(req, res, next) {
        const { id } = req.body
        const query = "DELETE FROM sanpham where id=?";
        const values = [id]

        db.query(query, values, (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            } else {
                return res.status(200).json({
                    message: "Xóa sản phẩm thành công",
                    sanPham: true
                })
            }
        })
    }
}

module.exports = new SanPhamController()
