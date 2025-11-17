const db = require("../config/db");

class DanhGiaDonHang {
  danhGia(req, res, next) {
    const { idmanguoidung, tieude, noidung, diemdanhgia, ngay, iddonhang } =
      req.body;
    const query =
      "INSERT INTO danhgia (idmanguoidung, tieude, noidung, diemdanhgia, ngay, iddonhang) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      idmanguoidung,
      tieude,
      noidung,
      diemdanhgia,
      ngay,
      iddonhang,
    ];
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
          danhGia: result[0],
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
          danhGia: result,
        });
      }
    });
  }

  laySoLuotDanhGiaChoSanPham(req, res, next) {
    const { idsanpham } = req.body;
    const query = `SELECT COUNT(*) as luotdanhgia
                  FROM danhgia AS dg
                  JOIN taikhoan AS tk ON dg.idmanguoidung = tk.id
                  JOIN chitietdonhang AS ctdh ON dg.iddonhang = ctdh.iddonhang
                  JOIN sanpham AS sp ON ctdh.idsanpham = sp.id
                  where sp.id = ?`;
    const values = [idsanpham];
    db.query(query, values, (error, result, fields) => {
      if (error) {
        return res.status(400).json({ error });
      } else {
        return res.status(200).json({
          message: "Lấy danh sách đánh giá thành công",
          danhGia: result[0].luotdanhgia,
        });
      }
    });
  }

  layDsDanhGiaChoSanPham(req, res, next) {
    const { idsanpham } = req.body;
    const query = `SELECT 
                      dg.idmanguoidung,
                      tk.tennguoidung,
                      dg.tieude,
                      dg.noidung,
                      dg.diemdanhgia,
                      dg.ngay,
                      dg.iddonhang,
                      sp.id AS idsanpham_danhgia,
                      sp.ten AS tensanpham_danhgia,
                      sp2.id AS idsanpham_cungdonhang,
                      sp2.ten AS tensanpham_cungdonhang
                  FROM danhgia dg
                  JOIN taikhoan tk ON dg.idmanguoidung = tk.id
                  JOIN chitietdonhang ctdh ON dg.iddonhang = ctdh.iddonhang
                  JOIN sanpham sp ON ctdh.idsanpham = sp.id
                  JOIN chitietdonhang ctdh2 ON dg.iddonhang = ctdh2.iddonhang 
                  LEFT JOIN sanpham sp2 ON ctdh2.idsanpham = sp2.id AND sp2.id <> sp.id 
                  WHERE sp.id = ? 
                  ORDER BY dg.iddonhang, sp2.id;`;
    const values = [idsanpham];
    db.query(query, values, (error, result, fields) => {
      if (error) {
        return res.status(400).json({ error });
      } else {
        return res.status(200).json({
          message: "Lấy danh sách đánh giá thành công",
          danhGia: result,
        });
      }
    });
  }
}

module.exports = new DanhGiaDonHang();
