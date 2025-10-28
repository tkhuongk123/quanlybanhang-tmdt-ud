import { useEffect, useState } from "react";
import "./MonNoiBat.css";
import { layDsSanPhamPhoBien } from "../../../../services/SanPhamAPI.js";
import formatPrice from "../../../../utils/formatPrice.js";
import { NotifySuccess } from "../../../components/Toast/index.js";
import ChonSoLuong from "./ChonSoLuong/index.js";
import { api } from "../../../../services/config.js";

function MonNoiBat() {
  const [dsMon, setDsMon] = useState([]);
  const [chiTiet, setChiTiet] = useState('none')
  const [sanPham, setSanPham] = useState('');

  useEffect(() => {
    (async () => {
      const data = await layDsSanPhamPhoBien();
      if (data.dsSanPhamPhoBien) {
        setDsMon(data.dsSanPhamPhoBien);
      } else {
        console.log("error lay san pham theo loai");
      }
    })();
  }, []);

  function themVaoGio(sanPham) {
    const gioHang = JSON.parse(localStorage.getItem("giohang"));
    if (!gioHang || gioHang.lenght === 0) 
    {
      const gioHang = [
        {
          id: sanPham.id,
          soluong: 1,
        },
      ];
      localStorage.setItem("giohang", JSON.stringify(gioHang));
    } 
    else 
    {
      for (let x of gioHang) {
        if (x.id === sanPham.id) {
          x.soluong += 1;
          localStorage.setItem("giohang", JSON.stringify(gioHang));
          NotifySuccess(`Đã thêm "${sanPham.ten}" vào giỏ hàng`);
          return;
        }
      }
      gioHang.push({
        id: sanPham.id,
        soluong: 1,
      });
      localStorage.setItem("giohang", JSON.stringify(gioHang));
    }
    NotifySuccess(`Đã thêm "${sanPham.ten}" vào giỏ hàng`);
  }

  return (
    <div className="MonNoiBat">
      <div className="MonNoiBat_content">
        <h2 className="MonNoiBat_header">Món ăn nổi bật</h2>
        <div className="MonNoiBat_list">
          {dsMon.map((item, index) => {
            return (
              <div className="MonNoiBat_item" key={index} onClick={(e) => {
                if(e.target.className !== "MonNoiBat_item-add") {
                  setSanPham(item);
                  setChiTiet('flex');
                }
              }}>
                <div className="MonNoiBat_item-img">
                  <img
                    src={
                          item.image ? 
                          `${api}/public/uploads/ProductImages/${item.image}`
                          : `${process.env.PUBLIC_URL}/favicon.png`
                        }
                    alt="sanpham"
                  />
                </div>
                <h3 className="MonNoiBat_item-title">{index + 1 + ". " + item.ten}</h3>
                <div className="MonNoiBat_item-price">
                  Giá bán: <span>{formatPrice(item.dongia)}</span>
                </div>
                <button
                  className="MonNoiBat_item-add"
                  onClick={() => {
                    themVaoGio(item);
                  }}
                >
                  Thêm
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <ChonSoLuong sanPham={sanPham} display={chiTiet} setDisplay={setChiTiet} />
    </div>
  );
}

export default MonNoiBat;
