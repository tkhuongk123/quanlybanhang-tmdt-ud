import { useState, useEffect } from "react";
import { layDs } from "../../../services/LoaiSanPhamAPI.js";
import {
  layDsSanPham,
  layDsSanPhamPhoBien,
  tongDonHangTheoSanPham,
} from "../../../services/SanPhamAPI.js";
import "./ChonMon.css";
import ChonSoLuong from "./ChonSoLuong";
import formatPrice from "../../../utils/formatPrice.js";
import { api } from "../../../services/config.js";
import { NotifySuccess } from "../../components/Toast/index.js";
import { Pagination } from "antd";
import {
  layDsDanhGiaChoSanPham,
  laySoLuotDanhGiaChoSanPham,
} from "../../../services/DanhGiaAPI.js";

function ChonMon() {
  const [dsLoai, setDsLoai] = useState([]);
  const [dsSanPham, setDsSanPham] = useState([]);
  const [popularDishs, setPopularDishs] = useState([]);
  const [loaiDangChon, setLoaiDangChon] = useState(-1);
  const [tuKhoa, setTuKhoa] = useState("");
  const [chiTiet, setChiTiet] = useState("none");
  const [sanPham, setSanPham] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    (async () => {
      const dataDsLoaiSanPham = await layDs();
      const dataDsSanPham = await layDsSanPham();
      const dataPopularDishs = await layDsSanPhamPhoBien();
      if (!dataDsLoaiSanPham.dsLoaiSanPham || !dataDsSanPham.dsSanPham) {
        console.log("error lay danh sach loai");
      } else {
        const dsSanPhamCoThongTinThem = await Promise.all(
          dataDsSanPham.dsSanPham.map(async (sp) => {
            const dataSodonhang = await tongDonHangTheoSanPham({
              idsanpham: sp.id,
            });
            const dataLuotthich = await laySoLuotDanhGiaChoSanPham({
              idsanpham: sp.id,
            });

            return {
              ...sp,
              sodonhang: dataSodonhang.sodonhang,
              luotthich: dataLuotthich.danhGia,
            };
          })
        );
        const dsPopularDishsCoThongTinThem = await Promise.all(
          dataPopularDishs.dsSanPhamPhoBien.map(async (sp) => {
            const dataSodonhang = await tongDonHangTheoSanPham({
              idsanpham: sp.id,
            });
            const dataLuotthich = await laySoLuotDanhGiaChoSanPham({
              idsanpham: sp.id,
            });

            return {
              ...sp,
              sodonhang: dataSodonhang.sodonhang,
              luotthich: dataLuotthich.danhGia,
            };
          })
        );
        setDsLoai(dataDsLoaiSanPham.dsLoaiSanPham);
        setDsSanPham(dsSanPhamCoThongTinThem);
        setPopularDishs(dsPopularDishsCoThongTinThem);
      }
    })();
  }, []);

  const xuLyThayDoiLoai = (loai) => {
    setLoaiDangChon(loai);
    setCurrentPage(1);
    setTuKhoa("");
  };

  const xuLyTimKiem = (e) => {
    setTuKhoa(e.target.value);
  };

  const xuLyXoaTimKiem = () => {
    setTuKhoa("");
  };

  const sanPhamDaLoc =
    loaiDangChon == -1
      ? popularDishs.filter((sanPham) => {
          const khopTuKhoa = sanPham.ten
            .toLowerCase()
            .includes(tuKhoa.toLowerCase());
          return khopTuKhoa;
        })
      : dsSanPham.filter((sanPham) => {
          const khopLoai =
            loaiDangChon === 0 || sanPham.idloaisanpham === loaiDangChon;
          const khopTuKhoa = sanPham.ten
            .toLowerCase()
            .includes(tuKhoa.toLowerCase());
          return khopLoai && khopTuKhoa;
        });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const sanPhamHienThi = sanPhamDaLoc.slice(startIndex, endIndex);

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
    <div className="ChonMon">
      <div className="ChonMon_header">
        PURETASTE KITCHEN KÍNH CHÀO QUÝ KHÁCH
      </div>
      <div className="ChonMon_content">
        <div className="ChonMon_filter">
          <div className="filter-loai">
            <button
              className={`filter-btn ${loaiDangChon === -1 ? "active" : ""}`}
              onClick={() => xuLyThayDoiLoai(-1)}
            >
              Món nổi bật
            </button>
            <button
              className={`filter-btn ${loaiDangChon === 0 ? "active" : ""}`}
              onClick={() => xuLyThayDoiLoai(0)}
            >
              Tất cả
            </button>
            {dsLoai.map((loai) => (
              <button
                key={loai.id}
                className={`filter-btn ${
                  loaiDangChon === loai.id ? "active" : ""
                }`}
                onClick={() => xuLyThayDoiLoai(loai.id)}
              >
                {loai.ten}
              </button>
            ))}
          </div>

          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm món ăn..."
              value={tuKhoa}
              onChange={xuLyTimKiem}
            />
            {tuKhoa && (
              <button className="search-clear" onClick={xuLyXoaTimKiem}>
                ✕
              </button>
            )}
          </div>
        </div>
        <div className="ChonMon_list">
          {sanPhamHienThi.map((item, index) => {
            return (
              <div
                className="MonAn"
                key={index}
                onClick={(e) => {
                  if (e.target.className !== "MonAn-add") {
                    setSanPham(item);
                    setChiTiet("flex");
                  }
                }}
              >
                <div className="MonAn-img">
                  <img
                    src={
                      item.image
                        ? `${api}/public/uploads/ProductImages/${item.image}`
                        : `${process.env.PUBLIC_URL}/favicon.png`
                    }
                    alt="sanpham"
                  />
                </div>
                <h3 className="MonAn-title">{item.ten}</h3>
                <div className="MonAn-sub-info">
                  <span className="order-quantity">
                    {item.sodonhang > 0 ? item.sodonhang + " đã bán " : ""}
                  </span>
                  {item.luotthich > 0 ? (
                    <span className="like-quantity">
                      {item.luotthich + " lượt thích"}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="MonAn-price">
                  <span>{formatPrice(item.dongia)}</span>
                </div>

                <button
                  className="MonAn-add"
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
        <div className="ChonMon_pagination">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={sanPhamDaLoc.length}
            onChange={(page) => setCurrentPage(page)}
            style={{ marginTop: 20, textAlign: "center" }}
          />
        </div>
      </div>
      {/* --- WHY CHOOSE US --- */}
      <section className="why-choose-us">
        <div className="why-header">
          <h2>Tại sao chọn chúng tôi</h2>
          <p>Cam kết mang đến dịch vụ tốt nhất cho khách hàng</p>
        </div>

        <div className="why-cards">
          {/* Card 1 */}
          <div className="why-card">
            <div className="icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.021 6.188h6.508c.969 0 
                      1.371 1.24.588 1.81l-5.267 3.83 2.02 6.188c.3.922-.755 
                      1.688-1.54 1.118L12 17.75l-5.282 3.311c-.785.57-1.84-.196-
                      1.54-1.118l2.02-6.188-5.267-3.83c-.783-.57-.38-1.81.
                      588-1.81h6.508l2.022-6.188z"
                />
              </svg>
            </div>
            <h3>Chất lượng cao</h3>
            <p>
              Sản phẩm được tuyển chọn kỹ lưỡng, đảm bảo chất lượng tốt nhất
            </p>
          </div>

          {/* Card 2 */}
          <div className="why-card">
            <div className="icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                />
              </svg>
            </div>
            <h3>Bảo hành uy tín</h3>
            <p>Chính sách bảo hành rõ ràng, hỗ trợ khách hàng tận tâm</p>
          </div>

          {/* Card 3 */}
          <div className="why-card">
            <div className="icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17a2 2 0 100 4 2 2 0 000-4zm6 
                      0a2 2 0 100 4 2 2 0 000-4zm1-9h2l3 
                      5v6a2 2 0 01-2 2h-1m-14 
                      0a2 2 0 01-2-2V6a2 2 0 
                      012-2h11v12H6z"
                />
              </svg>
            </div>
            <h3>Giao hàng nhanh</h3>
            <p>Vận chuyển toàn quốc, giao hàng nhanh chóng và an toàn</p>
          </div>
        </div>
      </section>
      <ChonSoLuong
        sanPham={sanPham}
        display={chiTiet}
        setDisplay={setChiTiet}
      />
    </div>
  );
}

export default ChonMon;
