import { useEffect, useState } from "react";
import "./QuanLyTaiKhoan.css";
import { Table } from "antd";
import { layDsTaiKhoan } from "../../../services/TaiKhoanAPI";
import formatQuyen from "../../../utils/formatQuyen";
import Them from "./Them";
import Sua from "./Sua";
import Xoa from "./Xoa";

function QuanLyTaiKhoan() {
  const [dsTaiKhoan, setDsTaiKhoan] = useState([]);
  const [chucNang, setChucNang] = useState('');

  useEffect(() => {
    (async () => {
      const data = await layDsTaiKhoan();
      if (data.error) {
        console.log(data.error);
      } else {
        setDsTaiKhoan(data.dsTaiKhoan);
      }
    })();
  }, []);

  const dataSource = dsTaiKhoan.map((item, index) => {
    return {
      key: index,
      id: item.id,
      tendangnhap: item.tendangnhap,
      tennguoidung: item.tennguoidung,
      email: item.email,
      sodienthoai: item.sodienthoai,
      idquyen: formatQuyen(item.idquyen),
      sua: <button className="btn-sua" onClick={() => {
        setChucNang(<Sua setChucNang={setChucNang} dsTaiKhoan={dsTaiKhoan} taiKhoan={item} index={index} setDsTaiKhoan={setDsTaiKhoan} />)
      }}><i className="fa-solid fa-pen-to-square"></i></button>,
      xoa:  <button className="btn-xoa" onClick={() => {
        setChucNang(<Xoa setChucNang={setChucNang} dsTaiKhoan={dsTaiKhoan} taiKhoan={item} index={index} setDsTaiKhoan={setDsTaiKhoan} />)
      }}><i className="fa-solid fa-trash"></i></button>,
    };
  });

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
        title: "Tên đăng nhập",
        dataIndex: "tendangnhap",
        key: "tendangnhap",
      },
      {
        title: "Tên người dùng",
        dataIndex: "tennguoidung",
        key: "tennguoidung",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Số điện thoại",
        dataIndex: "sodienthoai",
        key: "sodienthoai",
      },
      {
        title: "Quyền",
        dataIndex: "idquyen",
        key: "idquyen",
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
    <div className="QuanLyTaiKhoan">
      <div className="QuanLyTaiKhoan_content">
        <h2>Quản lý tài khoản</h2>
        <button className="QuanLyTaiKhoan_content-them" onClick={() => { setChucNang(<Them setChucNang={setChucNang} dsTaiKhoan={dsTaiKhoan} setDsTaiKhoan={setDsTaiKhoan} />) }}>Thêm</button>
        {
            dsTaiKhoan ? <Table
            dataSource={dataSource}
            columns={columns}
            className="DanhSachDonHang_content-table"
            pagination={{pageSize: 5}}
          /> : ''
        }
      </div>
      { chucNang }
    </div>
  );
}

export default QuanLyTaiKhoan;
