import { useEffect, useState } from "react";
import "./QuanLyLoaiSanPham.css";
import { Table } from "antd";
import { layDs } from "../../../services/LoaiSanPhamAPI";
import Them from "./Them";
import Sua from "./Sua";
import Xoa from "./Xoa";

function QuanLyLoaiSanPham() {
  const [dsLoaiSanPham, setDsLoaiSanPham] = useState([]);
  const [chucNang, setChucNang] = useState("");

  useEffect(() => {
    (async () => {
      const data = await layDs();
      if (data.error) {
        console.log(data.error);
      } else {
        setDsLoaiSanPham(data.dsLoaiSanPham);
      }
    })();
  }, []);

  const dataSource = dsLoaiSanPham.map((item, index) => {
    return {
      key: index,
      id: item.id,
      ten: item.ten,
      mota: item.mota,
      sua: (
        <button
          className="btn-sua"
          onClick={() => {
            setChucNang(
              <Sua
                setChucNang={setChucNang}
                dsLoaiSanPham={dsLoaiSanPham}
                loaiSanPham={item}
                index={index}
                setDsLoaiSanPham={setDsLoaiSanPham}
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
                dsLoaiSanPham={dsLoaiSanPham}
                loaiSanPham={item}
                index={index}
                setDsLoaiSanPham={setDsLoaiSanPham}
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
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Mô tả",
      dataIndex: "mota",
      key: "mota",
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
    <div className="QuanLyLoaiSanPham">
      <div className="QuanLyLoaiSanPham_content">
        <h2>Quản lý loại sản phẩm</h2>
        <button
          className="QuanLyLoaiSanPham_content-them"
          onClick={() => {
            setChucNang(
              <Them
                setChucNang={setChucNang}
                dsLoaiSanPham={dsLoaiSanPham}
                setDsLoaiSanPham={setDsLoaiSanPham}
              />
            );
          }}
        >
          Thêm
        </button>
        {dsLoaiSanPham ? (
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

export default QuanLyLoaiSanPham;
