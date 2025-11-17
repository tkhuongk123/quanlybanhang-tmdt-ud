const multer = require("multer");
const path = require("path");
const fs = require("fs");

const db = require("../config/db");

class SanPhamController {

    uploadImage(req, res, next) {
        // Cấu hình lưu file
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const folder = req.query.folder || "default";
                const uploadPath = path.join(__dirname, `../../public/uploads/${folder}`);
                // Nếu folder chưa tồn tại thì tạo
                if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
                }
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                // const id = req.query.id;
                // const ext = path.extname(file.originalname); 
                cb(null, file.originalname);
            },
        });

        const upload = multer({ storage }).single("file");

        // Gọi middleware upload
        upload(req, res, function (err) {
            if (err) {
                return res.status(400).json({ error: "Upload thất bại", details: err });
            }

            if (!req.file) {
                return res.status(400).json({ error: "Không có file nào được chọn" });
            }

            // Trả về đường dẫn ảnh
            res.json({
                message: "Upload thành công",
                url: `/images/${req.file.filename}`,
            });
        });
    }

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
            if (error) 
            {
                return res.status(400).json({
                    error: error
                })
            } 
            else 
            {
                return res.status(200).json({
                    message: "Lấy danh sách sản phẩm thành công",
                    dsSanPham: result
                })
            }
        });
    }

    tongSanPham(req, res, next) {
        const query = "SELECT COUNT(*) as tongSanPham FROM sanpham";
        db.query(query, (error, result, field) => {
            if (error) 
            {
                return res.status(400).json({
                    error: error
                })
            } 
            else 
            {
                return res.status(200).json({
                    message: "Lấy tổng sản phẩm thành công",
                    tongSanPham: result[0].tongSanPham
                })
            }
        })
    }

    tongDonHangTheoSanPham(req, res, next) {
        const { idsanpham } = req.body; 
        const query = `
            SELECT 
                sp.id AS idsanpham,
                sp.ten AS tensanpham,
                COUNT(DISTINCT ctdh.iddonhang) AS sodonhang
            FROM chitietdonhang ctdh
            JOIN sanpham sp ON sp.id = ctdh.idsanpham
            JOIN donhang dh ON dh.id = ctdh.iddonhang
            WHERE sp.id = ? AND dh.trangthai = 11
            GROUP BY sp.id, sp.ten
        `;

        db.query(query, [idsanpham], (error, result, field) => {
            if (error) {
                return res.status(400).json({ error });
            }

            // nếu không có đơn nào thì trả về 0
            if (result.length === 0) {
                return res.status(200).json({
                    message: "Sản phẩm chưa có đơn hàng nào",
                    idsanpham: idsanpham,
                    sodonhang: 0
                });
            }

            return res.status(200).json({
                message: "Lấy số lượng đơn hàng theo sản phẩm thành công",
                idsanpham: result[0].idsanpham,
                tensanpham: result[0].tensanpham,
                sodonhang: result[0].sodonhang
            });
        });
    }


    layDsSanPhamPhoBien(req, res, next) {
        const query = `SELECT
                            sp.id,
                            sp.ten,
                            sp.dongia,
                            sp.mota,
                            sp.image,
                            COUNT(DISTINCT ctdh.iddonhang) AS so_don_hang
                        FROM chitietdonhang ctdh
                        JOIN sanpham sp ON sp.id = ctdh.idsanpham
                        JOIN donhang dh ON dh.id = ctdh.iddonhang
                        WHERE dh.trangthai = 11
                        GROUP BY sp.id, sp.ten
                        ORDER BY so_don_hang DESC
                        LIMIT 3`;
        db.query(query, (error, result, field) => {
            if (error) 
            {
                return res.status(400).json({
                    error: error
                })
            } 
            else 
            {
                return res.status(200).json({
                    message: "Lấy danh sách sản phẩm thành công",
                    dsSanPhamPhoBien: result
                })
            }
        });
    }

    isExistInDonHang(req, res, next) {
        const { id } = req.body
        const query = "SELECT * FROM chitietdonhang where idsanpham=?";
        const values = [id]

        db.query(query, values, (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error: error
                })
            } 
            if (result.length > 0) 
            {
                return res.status(200).json({
                    exist: true,
                    message: "Sản phẩm đang tồn tại trong đơn hàng"
                });
            } 
            else 
            {
                return res.status(200).json({
                    exist: false,
                    message: "Sản phẩm không tồn tại trong đơn hàng"
                });
            }
        })
    }

    them(req, res, next) {
        const { idloaisanpham, ten, dongia, mota, image } = req.body;

        const checkTenSanPham = /[~`!@#$%^&*()_\-+={}\[\]|\\:;"'<>,.?/]/.test(ten);
        const checkDonGia = /^[0-9]+$/.test(dongia);
        const imageName = image.fileList[0].name;
        console.log("image: ", image.fileList[0].name);
        console.log(typeof image.fileList[0].name);

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
            const query = "INSERT INTO sanpham (idloaisanpham, ten, dongia, mota, image) VALUES (?, ?, ?, ?, ?)";
            const values = [idloaisanpham, ten, dongia, mota, imageName]

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
        const { id, ten, dongia, mota, idloaisanpham, image } = req.body
        const checkTenSanPham = /[~`!@#$%^&*()_\-+={}\[\]|\\:;"'<>,.?/]/.test(ten);
        const checkDonGia = /^[0-9]+$/.test(dongia);
        const imageName = image.fileList[0].name ? image.fileList[0].name : image;

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
            const query = "UPDATE sanpham SET idloaisanpham=?, ten=?, dongia=?, mota=?, image=? where id=?";
            const values = [idloaisanpham, ten, dongia, mota, imageName, id];

            db.query(query, values, (error, result, field) => {
                if (error) 
                {
                    return res.status(400).json({
                        error: error
                    })
                } 
                else 
                {
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
