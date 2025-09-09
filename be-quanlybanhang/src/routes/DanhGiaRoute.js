const express = require('express');
const router = express.Router();
const DanhGiaController = require("../controllers/DanhGiaController");

router.get('/layDsDanhGia', DanhGiaController.layDsDanhGia);
router.post('/layDanhGiaTheoId', DanhGiaController.layDanhGiaTheoId);
router.post('/danhGia', DanhGiaController.danhGia);
module.exports = router;

