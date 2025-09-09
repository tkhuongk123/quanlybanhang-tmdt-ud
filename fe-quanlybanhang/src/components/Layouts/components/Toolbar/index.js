import { useEffect, useState } from "react";
import "./Toolbar.css";
import { useNavigate } from "react-router-dom";

function Toolbar() {
  const [dsChucNang, setDsChucNang] = useState("");
  const [tenNguoiDung, setTenNguoiDung] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const nguoidung = JSON.parse(sessionStorage.getItem("nguoidung"));
    setTenNguoiDung(nguoidung.tennguoidung);
    if (nguoidung.idquyen === 0) {
      setDsChucNang(
        <>
          <li
            onClick={() => {
              navigate("/nhanvien/nhandon");
            }}
          >
            Nhận đơn
          </li>
          <li
            onClick={() => {
              navigate("/nhanvien/tradon");
            }}
          >
            Trả đơn
          </li>
          <li
            onClick={() => {
              navigate("/nhanvien/xuathoadon");
            }}
          >
            Xuất hóa đơn
          </li>
        </>
      );
    } else if (nguoidung.idquyen === 1) {
      setDsChucNang(
        <>
          <li
            onClick={() => {
              navigate("/quanly/donhang");
            }}
          >
            Lịch sử đơn hàng
          </li>
          <li
            onClick={() => {
              navigate("/quanly/xemdanhgia");
            }}
          >
            Xem đánh giá
          </li>
          <li
            onClick={() => {
              navigate("/quanly/taikhoan");
            }}
          >
            Tài khoản
          </li>
          <li
            onClick={() => {
              navigate("/quanly/sanpham");
            }}
          >
            Sản phẩm
          </li>
          <li
            onClick={() => {
              navigate("/quanly/loaisanpham");
            }}
          >
            Loại sản phẩm
          </li>
        </>
      );
    } else if (nguoidung.idquyen === 2) {
      setDsChucNang(
        <>
          <li
            onClick={() => {
              navigate("/bep/nhandon");
            }}
          >
            Nhận đơn
          </li>
          <li
            onClick={() => {
              navigate("/bep/tradon");
            }}
          >
            Trả đơn
          </li>
        </>
      );
    } else if (nguoidung.idquyen === 3) {
      setDsChucNang(
        <>
          <li
            onClick={() => {
              navigate("/");
            }}
          >
            Trang chủ
          </li>
          <li
            onClick={() => {
              navigate("/auth/giohang");
            }}
          >
            Giỏ hàng
          </li>
          <li
            onClick={() => {
              navigate("/donhang");
            }}
          >
            Đơn hàng
          </li>
          <li
            onClick={() => {
              navigate("/danhgia");
            }}
          >
            Đánh giá
          </li>
        </>
      );
    }
  }, [navigate]);

  return (
    <nav className="Toolbar">
      <div className="Toolbar_content">
        <div className="Toolbar_content-img">
          <img src={`${process.env.PUBLIC_URL}/favicon.png`} alt="Logo" />
        </div>
        <h4>Xin chào: {tenNguoiDung}</h4>
        <div className="Toolbar_content-subnav">
          <ul>
            {dsChucNang}
            <li
              onClick={(event) => {
                navigate('/')
                setTimeout(() => {
                  sessionStorage.removeItem("nguoidung");
                  window.location.reload();
                }, 100)
              }}
            >
              Đăng xuất
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Toolbar;
