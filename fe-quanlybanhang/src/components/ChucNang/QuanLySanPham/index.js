import { useEffect, useState } from "react";
import "./QuanLySanPham.css";
import { Table } from "antd";
import { layDsSanPham } from "../../../services/SanPhamAPI";
import { layDs } from "../../../services/LoaiSanPhamAPI";
import formatPrice from "../../../utils/formatPrice";
import Them from "./Them";
import Sua from "./Sua";
import Xoa from "./Xoa";

function QuanLySanPham() {
  const [dsSanPham, setDsSanPham] = useState([]);
  const [dsLoaiSanPham, setDSLoaiSanPham] = useState([]);
  const [chucNang, setChucNang] = useState("");

  useEffect(() => {
    (async () => {
      const dataLoaiSanPham = await layDs();
      const data = await layDsSanPham();
      if (data.error) {
        console.log(data.error);
      } else {
        for (let x of dataLoaiSanPham.dsLoaiSanPham) {
          for (let y of data.dsSanPham) {
            if (x.id === y.idloaisanpham) {
              y.tenloaisanpham = x.ten;
            }
          }
        }
        setDsSanPham(data.dsSanPham);
        setDSLoaiSanPham(dataLoaiSanPham.dsLoaiSanPham);
      }
    })();
  }, []);

  const dataSource = dsSanPham.map((item, index) => {
    return {
      key: index,
      id: item.id,
      ten: item.ten,
      dongia: formatPrice(item.dongia),
      tenloaisanpham: item.tenloaisanpham,
      sua: (
        <button
          className="btn-sua"
          onClick={() => {
            setChucNang(
              <Sua
                setChucNang={setChucNang}
                dsSanPham={dsSanPham}
                sanPham={item}
                index={index}
                setDsSanPham={setDsSanPham}
                dsLoaiSanPham={dsLoaiSanPham}
              />
            );
          }}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      ),
      xoa: (
        <button
          className="btn-xoa"
          onClick={() => {
            setChucNang(
              <Xoa
                setChucNang={setChucNang}
                dsSanPham={dsSanPham}
                sanPham={item}
                index={index}
                setDsSanPham={setDsSanPham}
              />
            );
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      ),
    };
  });

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Loại",
      dataIndex: "tenloaisanpham",
      key: "tenloaisanpham",
    },
    {
      title: "Đơn giá",
      dataIndex: "dongia",
      key: "dongia",
    },
    {
      title: "Sửa",
      dataIndex: "sua",
      key: "sua",
    },
    {
      title: "Xóa",
      dataIndex: "xoa",
      key: "xoa",
    },
  ];

  return (
    <div className="QuanLySanPham">
      <div className="QuanLySanPham_content">
        <h2>Quản lý sản phẩm</h2>
        <button
          className="QuanLySanPham_content-them"
          onClick={() => {
            setChucNang(
              <Them
                setChucNang={setChucNang}
                dsSanPham={dsSanPham}
                setDsSanPham={setDsSanPham}
                dsLoaiSanPham={dsLoaiSanPham}
              />
            );
          }}
        >
          Thêm
        </button>
        {dsSanPham ? (
          <Table
            dataSource={dataSource}
            columns={columns}
            className="DanhSachDonHang_content-table"
            pagination={{ pageSize: 5 }}
          />
        ) : (
          ""
        )}
      </div>
      {chucNang}
    </div>
  );
}

export default QuanLySanPham;
