import "./XemDanhGia.css";
import { useEffect, useState } from "react";
import DanhSachDonHang from "../../components/DanhSachDonHang";
import { layDanhSach } from "../../../services/DonHangAPI";
import ThongBaoTrong from "../../components/ThongBaoTrong";
import { layTaiKhoan } from "../../../services/TaiKhoanAPI";
import { layDanhGiaTheoId } from "../../../services/DanhGiaAPI";

function XemDanhGia() {
  const [dsDonHang, setDsDonHang] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await layDanhSach();
      if (data.dsDonHang) {
        const newDs = [];
        for (let x of data.dsDonHang) {
          if (x.trangthai === "12" || x.trangthai === "11") {
            const data = await layTaiKhoan({ id: x.idmanguoidung });
            if (data.taiKhoan) {
              x.nguoidat = `${data.taiKhoan.tennguoidung} - ${data.taiKhoan.id}`;
              const dataDanhGia = await layDanhGiaTheoId({iddonhang: x.id})
              if(dataDanhGia.danhGia) {
                newDs.push(x);
              }
            }
          } 
        }
        setDsDonHang(newDs);
      }
    })();
  }, []);

  return (
    <div className="XemDanhGia">
      <div className="XemDanhGia_content">
        <h2>Lịch sử đánh giá</h2>
        {dsDonHang.length === 0 ? (
          <ThongBaoTrong
            message="Chưa có đánh giá nào"
          />
        ) : (
          <DanhSachDonHang dsDonHang={dsDonHang} option="01"/>
        )}
      </div>
    </div>
  );
}

export default XemDanhGia;
