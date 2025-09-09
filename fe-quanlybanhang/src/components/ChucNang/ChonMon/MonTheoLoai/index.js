import { useEffect, useState } from "react";
import "./MonTheoLoai.css";
import { laySanPhamTheoLoai } from "../../../../services/SanPhamAPI.js";
import formatPrice from "../../../../utils/formatPrice.js";
import { NotifySuccess } from "../../../components/Toast/index.js";
import ChonSoLuong from "./ChonSoLuong/index.js";

function MonTheoLoai(props) {
  const [dsMon, setDsMon] = useState([]);
  const [chiTiet, setChiTiet] = useState('none')
  const [sanPham, setSanPham] = useState('');

  useEffect(() => {
    (async () => {
      const data = await laySanPhamTheoLoai({
        idloaisanpham: props.idloaisanpham,
      });
      if (data.dsSanPham) {
        setDsMon(data.dsSanPham);
      } else {
        console.log("error lay san pham theo loai");
      }
    })();
  }, [props]);

  function themVaoGio(sanPham) {
    const gioHang = JSON.parse(localStorage.getItem("giohang"));
    if (!gioHang || gioHang.lenght === 0) {
      const gioHang = [
        {
          id: sanPham.id,
          soluong: 1,
        },
      ];
      localStorage.setItem("giohang", JSON.stringify(gioHang));
    } else {
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
    <div className="MonTheoLoai">
      <div className="MonTheoLoai_content">
        <h2 className="MonTheoLoai_header">{props.tenloaisanpham}</h2>
        <div className="MonTheoLoai_list">
          {dsMon.map((item, index) => {
            return (
              <div className="MonTheoLoai_item" key={index} onClick={(e) => {
                if(e.target.className !== "MonTheoLoai_item-add") {
                  setSanPham(item);
                  setChiTiet('flex');
                }
              }}>
                <div className="MonTheoLoai_item-img">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/hinhSanPham/${item.id}.jpg`}
                    alt="sanpham"
                  />
                </div>
                <h3 className="MonTheoLoai_item-title">{index + 1 + ". " + item.ten}</h3>
                <div className="MonTheoLoai_item-price">
                  Giá bán: <span>{formatPrice(item.dongia)}</span>
                </div>
                <button
                  className="MonTheoLoai_item-add"
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

export default MonTheoLoai;
