const db = require("../config/db");

class DanhGiaDonHang {
  danhGia(req, res, next) {
    const { idmanguoidung, noidung, diemdanhgia, ngay, iddonhang } = req.body;
    const query =
      "INSERT INTO danhgia (idmanguoidung, noidung, diemdanhgia, ngay, iddonhang) VALUES (?, ?, ?, ?, ?)";
    const values = [idmanguoidung, noidung, diemdanhgia, ngay, iddonhang];
    db.query(query, values, (error, result, field) => {
      if (error) {
        return res.status(400).json({
          error: error,
        });
      } else {
        return res.status(200).json({
          message: "Đánh giá thành công",
          danhGia: true,
        });
      }
    });
  }

  layDanhGiaTheoId(req, res, next) {
    const { iddonhang } = req.body;
    const query = "SELECT * FROM danhgia where iddonhang=? ";
    const values = [iddonhang];
    db.query(query, values, (error, result, field) => {
      if (error) {
        return res.status(400).json({
          error: error,
        });
      } else {
        return res.status(200).json({
          message: "Lấy đánh giá thành công",
          danhGia: result[0]
        });
      }
    });
  }

  layDsDanhGia(req, res, next) {
    const query = "SELECT * FROM danhgia";
    db.query(query, (error, result, field) => {
      if (error) {
        return res.status(400).json({
          error: error,
        });
      } else {
        return res.status(200).json({
          message: "Lấy danh sách đánh giá thành công",
          danhGia: result
        });
      }
    });
  }
}

module.exports = new DanhGiaDonHang();
