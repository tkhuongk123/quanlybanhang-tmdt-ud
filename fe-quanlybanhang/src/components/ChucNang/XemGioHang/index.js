import { useState, useEffect } from "react";
import "./XemGioHang.css";
import ThanhPhanGioHang from "../../components/ThongTinSanPham";
import formatPrice from "../../../utils/formatPrice";
import ThanhToan from "./ThanhToan";
import UpdateAddress from "./UpdateAddress";
import { Input, Form } from "antd";
import { MapPin } from "lucide-react";

import { laySanPhamTheoId } from "../../../services/SanPhamAPI";
import { NotifyError } from "../../components/Toast";
import ThongBaoTrong from "../../components/ThongBaoTrong";

function XemGioHang() {
  const [form] = Form.useForm();
  const [dsSanPham, setDsSanPham] = useState([]);
  const [diaChi, setDiaChi] = useState("");
  const [thanhToan, setThanhToan] = useState(<span></span>);
  const [updateAddress, setUpdateAddress] = useState(<span></span>);
  const [tienShip, setTienShip] = useState(0);

  useEffect(() => {
    const diachiData = JSON.parse(sessionStorage.getItem("nguoidung")).diachi || "";
    const khoangCach = JSON.parse(sessionStorage.getItem("khoangcach")) || 0;
    if(khoangCach > 0)
    {
      const ship = tinhTienShip(khoangCach);
      setTienShip(ship);
    }
    setDiaChi(diachiData);
  }, [diaChi]);

  useEffect(() => {
    const giohang = JSON.parse(localStorage.getItem("giohang"));
    if (giohang) 
    {
      (async () => {
        const newDs = [];
        for (let x of giohang) 
        {
          const data = await laySanPhamTheoId({ id: x.id });
          if (data.sanPham) 
          {
            data.sanPham.soluong = x.soluong;
            newDs.push(data.sanPham);
          } 
          else 
          {
            NotifyError(data.message);
          }
        }
        setDsSanPham(newDs);
      })();
    }
  }, []);

  function tinhTienShip(khoangCach) {
    let ship = 0;
    if(khoangCach >= 4)
    {
      ship = 15000 + Math.ceil(khoangCach - 3) * 3000;
    }
    else
    {
      ship = 15000;
    }
    return ship;
  }

  function tinhTongTien() {
    let tong = 0;
    for (let x of dsSanPham) {
      tong += x.soluong * x.dongia;
    }
    return tong + tienShip;
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

  const handleThanhToan = () => {
    if (!diaChi || diaChi.trim() === "") {
      NotifyError("Vui lòng nhập địa chỉ!");
      return;
    }

    setThanhToan(
      <ThanhToan
        setThanhToan={setThanhToan}
        tongSanPham={dsSanPham.length}
        tongTien={tinhTongTien()}
        tienShip={tienShip}
        dsSanPham={dsSanPham}
        setDsSanPham={setDsSanPham}
      />
    );
  };

  return (
    <div className="XemGioHang">
      <div className="XemGioHang_content">
        <h2>Giỏ hàng của tôi</h2>
        <div className="XemGioHang_address">
          <label htmlFor="">Giao đến:</label>
          <div className="content">
            <MapPin
              style={{ transform: 'translateY(3px)' }} 
            />
            <Input
              bordered={false}
              style={{ fontSize: "18px", width: "500px" }}
              value={diaChi} 
              readonly
            />

            <button
                onClick={() => {
                  setUpdateAddress(
                    <UpdateAddress
                      setDiaChi={setDiaChi}
                      setUpdateAddress={setUpdateAddress}
                      diaChi={diaChi}
                    />
                  );
                }}
                style={{ 
                  padding: '8px', 
                  background: '#ee4d2d', 
                  color: '#fff',
                  width: '200px',
                  borderRadius: '4px'
                }} 
              >
                Cập nhật địa chỉ
            </button>
          </div>
        </div>
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
              <span>Tiền ship: </span>
              <span className="XemGioHang_don-primary">{formatPrice(tienShip)}</span>
            </div>
            <div>
              <span>Tổng tiền: </span>
              <span className="XemGioHang_don-primary">
                {formatPrice(tinhTongTien())}
              </span>
            </div>
            <div>
              <button
                onClick={handleThanhToan}
              >
                Thanh toán
              </button>
            </div>
          </div>
        )}
      </div>
      {thanhToan}
      {updateAddress}
    </div>
  );
}

export default XemGioHang;
