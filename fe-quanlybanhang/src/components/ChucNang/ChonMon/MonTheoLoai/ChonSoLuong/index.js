import { useState } from "react";
import "./ChonSoLuong.css";
import formatPrice from "../../../../../utils/formatPrice";
import { NotifySuccess } from "../../../../components/Toast";

function ChonSoLuong(props) {
  const [soLuong, setSoLuong] = useState(1);

  function themVaoGioHang() {
    const gioHang = JSON.parse(localStorage.getItem("giohang"));
    if (!gioHang || gioHang.lenght === 0) {
      const gioHang = [
        {
          id: props.sanPham.id,
          soluong: soLuong,
        },
      ];
      localStorage.setItem("giohang", JSON.stringify(gioHang));
    } else {
      for (let x of gioHang) {
        if (x.id === props.sanPham.id) {
          x.soluong += soLuong;
          localStorage.setItem("giohang", JSON.stringify(gioHang));
          NotifySuccess(`Đã thêm "${props.sanPham.ten}" vào giỏ hàng`);
          return;
        }
      }
      gioHang.push({
        id: props.sanPham.id,
        soluong: soLuong,
      });
      localStorage.setItem("giohang", JSON.stringify(gioHang));
    }
    NotifySuccess(`Đã thêm "${props.sanPham.ten}" vào giỏ hàng`);
  }

  return (
    <div
      className="ChonSoLuong"
      style={{ display: props.display }}
      onClick={(e) => {
        if (e.target.className === "ChonSoLuong") {
          props.setDisplay("none");
        }
      }}
    >
      <div className="ChonSoLuong_content">
        <div className="ChonSoLuong_content-header">
          <h2>Thêm vào giỏ hàng</h2>
        </div>
        <div className="ChonSoLuong_content-detail">
          <div className="ChonSoLuong_content-detail_img">
            <img
              src={`${process.env.PUBLIC_URL}/assets/hinhSanPham/${props.sanPham.id}.jpg`}
              alt="sanpham"
            />
          </div>
          <div className="ChonSoLuong_content-detail_right-top-bottom">
            <h3>
              Món: <span>{props.sanPham.ten}</span>
            </h3>
            <h3>
              Giá bán: <span>{formatPrice(props.sanPham.dongia)}</span>
            </h3>
          </div>
          <div className="ChonSoLuong_content-detail_right-center-right">
            <h3>Số lượng:</h3>
            <div>
                <button onClick={() => {
                    if(soLuong > 1) {
                        setSoLuong(soLuong - 1)
                    }
                }}>
                <i className="fa-solid fa-minus"></i>
                </button>
                <span>{soLuong}</span>
                <button onClick={() => {
                    if(soLuong < 9) {
                        setSoLuong(soLuong + 1)
                    }
                }}>
                <i className="fa-solid fa-plus"></i>
                </button>
            </div>
          </div>
          <div className="ChonSoLuong_content-detail_right-bottom">
            <h3>Chi tiết sản phẩm:</h3>
            <p>{props.sanPham.mota}</p>
          </div>
          <button className="ChonSoLuong_content-detail_add" onClick={() => {
            themVaoGioHang()
          }}>
            <i className="fa-solid fa-cart-shopping"></i>
            {formatPrice(props.sanPham.dongia * soLuong)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChonSoLuong;
