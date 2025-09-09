const express = require('express');
const router = express.Router();
const SanPhamController = require("../controllers/SanPhamController.js");

router.post('/laySanPhamTheoLoai', SanPhamController.laySanPhamTheoLoai);
router.post('/laySanPhamTheoId', SanPhamController.laySanPhamTheoId);
router.get('/layDsSanPham', SanPhamController.layDsSanPham);
router.post('/them', SanPhamController.them);
router.post('/sua', SanPhamController.sua);
router.post('/xoa', SanPhamController.xoa);
module.exports = router;

