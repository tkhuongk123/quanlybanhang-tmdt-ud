import "./XemDonHang.css";
import { useEffect, useState } from "react";
import DanhSachDonHang from "../../components/DanhSachDonHang";
import { layDanhSachTheoId } from "../../../services/DonHangAPI";
import ThongBaoTrong from "../../components/ThongBaoTrong";

function XemDonHang() {
  const [dsDonHang, setDsDonHang] = useState([]);

  useEffect(() => {
    (async () => {
      const nguoidung = JSON.parse(sessionStorage.getItem("nguoidung"));
      const idmanguoidung = nguoidung.id;
      const data = await layDanhSachTheoId({ idmanguoidung });
      if (data.dsDonHang) {
        setDsDonHang(data.dsDonHang);
      }
    })();
  }, []);

  return (
    <div className="XemDonHang">
      <div className="XemDonHang_content">
        <h2>Đơn hàng của tôi</h2>
        {dsDonHang.length === 0 ? (
          <ThongBaoTrong
            title="Trang chủ"
            message="Chưa có đơn hàng nào"
            link="/"
          />
        ) : (
          <DanhSachDonHang dsDonHang={dsDonHang} option="30" />
        )}
      </div>
    </div>
  );
}

export default XemDonHang;
