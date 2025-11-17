import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { taoDonHang } from "../../services/DonHangAPI";
import { layNgayGio } from "../../utils/ngayGio";
import { NotifyError, NotifySuccess } from "../../components/components/Toast";
import { taoChiTiet } from "../../services/ChiTietDonHangAPI";

function MomoCallback() {
  const location = useLocation();
  const hasRun = useRef(false);


  const handleThanhToan = async () => {
    const nguoidung = JSON.parse(sessionStorage.getItem("nguoidung"));
    const ngay = layNgayGio();
    const thanhtoan = 1;
    const trangthai = 30;
    const tongtien = JSON.parse(sessionStorage.getItem("tongTien"));
    const tienShip = JSON.parse(sessionStorage.getItem("tienShip"));
    const tongsanpham = JSON.parse(sessionStorage.getItem("tongSanPham"));
    const idmanguoidung = nguoidung.id;
    const diachi = nguoidung.diachi;
    const ghichu = "";


    const data = await taoDonHang({
      idmanguoidung,
      trangthai,
      thanhtoan,
      tongtien,
      tienShip,
      tongsanpham,
      ngay,
      diachi,
      ghichu,
    });

    if (data.error) 
    {
        NotifyError("Lỗi tạo đơn hàng");
    } 
    else 
    {
        const dsSanPham = JSON.parse(sessionStorage.getItem("dsSanPham") || []);
        const iddonhang = data.id;
        for (let x of dsSanPham) 
        {
            const idsanpham = x.id;
            const soluong = x.soluong;
            await taoChiTiet({ iddonhang, idsanpham, soluong });
        }

        localStorage.removeItem("giohang");
        sessionStorage.removeItem("tongTien");
        sessionStorage.removeItem("tienShip");
        sessionStorage.removeItem("tongSanPham");
        sessionStorage.removeItem("dsSanPham");
        NotifySuccess("Thanh toán thành công!");
    }
  };

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      handleThanhToan().then(() => {
        handleRedirect();
      });
    }
  }, []);


  const handleRedirect = () => {
    window.location.href = "http://localhost:3000/auth/giohang";
  }

  return <button
        onClick={() => {
              handleRedirect();
            }}
        >
            Đang xử lý thanh toán...
        </button>;
}

export default MomoCallback;
