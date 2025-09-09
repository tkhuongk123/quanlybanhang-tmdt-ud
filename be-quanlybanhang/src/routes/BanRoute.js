const express = require('express');
const router = express.Router();
const BanController = require("../controllers/BanController");

router.post('/taoBan', BanController.taoBan);
router.post('/layBanTheoViTri', BanController.layBanTheoViTri);
router.get('/layDsBan', BanController.layDsBan);
router.post('/capNhapTrangThaiBanTheoId', BanController.capNhatTrangThaiBanTheoId);
router.post('/themBan', BanController.themBan);
router.post('/xoaBan', BanController.xoaBan);
module.exports = router;

