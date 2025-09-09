const express = require('express');
const router = express.Router();
const ChiTietDatBanController = require("../controllers/ChiTietDatBanController");

router.post('/taoChiTiet', ChiTietDatBanController.taoChiTiet);
router.post('/layDsChiTietDatBanTheoIdMaNguoiDung', ChiTietDatBanController.layDsChiTietDatBanTheoIdMaNguoiDung);
router.get('/layDsChiTietDatBan', ChiTietDatBanController.layDsChiTietDatBan);
router.get('/layDsChiTietDatBanTrongHangCho', ChiTietDatBanController.layDsChiTietDatBanTrongHangCho);
router.post('/capNhatTrangThaiChiTietDatBan', ChiTietDatBanController.capNhatTrangThaiChiTietDatBan);
module.exports = router;

