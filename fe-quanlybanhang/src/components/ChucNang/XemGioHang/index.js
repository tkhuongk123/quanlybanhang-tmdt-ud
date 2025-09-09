import { useState, useEffect } from "react";
import "./XemGioHang.css";
import ThanhPhanGioHang from "../../components/ThongTinSanPham";
import formatPrice from "../../../utils/formatPrice";
import ThanhToan from "./ThanhToan";

import { laySanPhamTheoId } from "../../../services/SanPhamAPI";
import { NotifyError } from "../../components/Toast";
import ThongBaoTrong from "../../components/ThongBaoTrong";

function XemGioHang() {
  const [dsSanPham, setDsSanPham] = useState([]);
  const [thanhToan, setThanhToan] = useState(<span></span>);

  useEffect(() => {
    const giohang = JSON.parse(localStorage.getItem("giohang"));
    if (giohang) {
      (async () => {
        const newDs = [];
        for (let x of giohang) {
          const data = await laySanPhamTheoId({ id: x.id });
          if (data.sanPham) {
            data.sanPham.soluong = x.soluong;
            newDs.push(data.sanPham);
          } else {
            NotifyError(data.message);
          }
        }
        setDsSanPham(newDs);
      })();
    }
  }, []);

  function tinhTongTien() {
    let tong = 0;
    for (let x of dsSanPham) {
      tong += x.soluong * x.dongia;
    }
    return tong;
  }

  function tang(sanPham) {
    sanPham.soluong++;
    const newDs = [...dsSanPham];
    for (let x of newDs) {
      if (x.id === sanPham.id) {
        x.soluong = sanPham.soluong;
      }
    }
    setDsSanPham(newDs);
    localStorage.setItem("giohang", JSON.stringify(newDs));
  }

  function giam(sanPham) {
    if (sanPham.soluong > 1) {
      sanPham.soluong--;
      const newDs = [...dsSanPham];
      for (let x of newDs) {
        if (x.id === sanPham.id) {
          x.soluong = sanPham.soluong;
        }
      }
      setDsSanPham(newDs);
      localStorage.setItem("giohang", JSON.stringify(newDs));
    }
  }

  function xoaSanPham(index) {
    const newDs = [...dsSanPham];
    newDs.splice(index, 1);
    setDsSanPham(newDs);
    localStorage.setItem("giohang", JSON.stringify(newDs));
  }

  return (
    <div className="XemGioHang">
      <div className="XemGioHang_content">
        <h2>Giỏ hàng của tôi</h2>
        <div className="XemGioHang_list">
          {dsSanPham.map((item, index) => {
            return (
              <div className="XemGioHang_item" key={index}>
                <div className="XemGioHang_item-sanpham">
                  <ThanhPhanGioHang item={item} />
                </div>
                <div className="XemGioHang_item-control">
                  <button
                    onClick={() => {
                      giam(item);
                    }}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span>{item.soluong}</span>
                  <button
                    onClick={() => {
                      tang(item);
                    }}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <div className="XemGioHang_item-delete">
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => {
                      xoaSanPham(index);
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        {dsSanPham.length === 0 ? (
          <ThongBaoTrong title="Trang chủ" message="Chưa có sản phẩm nào được thêm vào giỏ hàng" link="/"/>
        ) : (
          <div className="XemGioHang_don">
            <div>
              <span>Tổng sản phẩm: </span>
              <span className="XemGioHang_don-primary">{dsSanPham.length}</span>
            </div>
            <div>
              <span>Tổng tiền: </span>
              <span className="XemGioHang_don-primary">
                {formatPrice(tinhTongTien())}
              </span>
            </div>
            <div>
              <button
                onClick={() => {
                  setThanhToan(
                    <ThanhToan
                      setThanhToan={setThanhToan}
                      tongSanPham={dsSanPham.length}
                      tongTien={tinhTongTien()}
                      dsSanPham={dsSanPham}
                      setDsSanPham={setDsSanPham}
                    />
                  );
                }}
              >
                Thanh toán
              </button>
            </div>
          </div>
        )}
      </div>
      {thanhToan}
    </div>
  );
}

export default XemGioHang;
