const express = require('express');
const router = express.Router();
const SanPhamController = require("../controllers/SanPhamController.js");

router.post('/laySanPhamTheoLoai', SanPhamController.laySanPhamTheoLoai);
router.post('/laySanPhamTheoId', SanPhamController.laySanPhamTheoId);
router.get('/layDsSanPham', SanPhamController.layDsSanPham);
router.get('/tongSanPham', SanPhamController.tongSanPham);
router.get('/layDsSanPhamPhoBien', SanPhamController.layDsSanPhamPhoBien);
router.post('/tongDonHangTheoSanPham', SanPhamController.tongDonHangTheoSanPham);
router.post('/checksanpham', SanPhamController.isExistInDonHang);
router.post('/them', SanPhamController.them);
router.post('/sua', SanPhamController.sua);
router.post('/xoa', SanPhamController.xoa);
router.post('/uploadImage', SanPhamController.uploadImage);
module.exports = router;

