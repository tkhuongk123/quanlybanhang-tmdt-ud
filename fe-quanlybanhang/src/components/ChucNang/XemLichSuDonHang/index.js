import "./XemLichSuDonHang.css";
import { useEffect, useState } from "react";
import DanhSachDonHang from "../../components/DanhSachDonHang";
import { layDanhSach } from "../../../services/DonHangAPI";
import ThongBaoTrong from "../../components/ThongBaoTrong";
import { layTaiKhoan } from "../../../services/TaiKhoanAPI";

function XemLichSuDonHang() {
  const [dsDonHang, setDsDonHang] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await layDanhSach();
      if (data.dsDonHang) {
        const newDs = [];
        for (let x of data.dsDonHang) {
          const data = await layTaiKhoan({ id: x.idmanguoidung });
          if (data.taiKhoan) {
            x.nguoidat = `${data.taiKhoan.tennguoidung} - ${data.taiKhoan.id}`;
            newDs.push(x);
          }
        }
        setDsDonHang(newDs);
      }
    })();
  }, []);

  return (
    <div className="XemLichSuDonHang">
      <div className="XemLichSuDonHang_content">
        <h2>Lịch sử đơn hàng</h2>
        {dsDonHang.length === 0 ? (
          <ThongBaoTrong message="Chưa có đơn hàng nào" />
        ) : (
          <DanhSachDonHang dsDonHang={dsDonHang} option="00" />
        )}
      </div>
    </div>
  );
}

export default XemLichSuDonHang;
