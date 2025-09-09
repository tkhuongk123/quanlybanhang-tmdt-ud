import { useState, useEffect } from "react";
import { layDs } from "../../../services/LoaiSanPhamAPI.js";
import MonTheoLoai from "./MonTheoLoai";
import "./ChonMon.css";

function ChonMon() {
  const [dsLoai, setDsLoai] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await layDs();
      if (data.dsLoaiSanPham) {
        setDsLoai(data.dsLoaiSanPham);
      } else {
        console.log("error lay danh sach loai");
      }
    })();
  }, []);

  return (
    <div className="ChonMon">
      <div className="ChonMon_content">
        <h2 className="ChonMon_header">PT KITCHEN KÍNH CHÀO QUÝ KHÁCH</h2>
        <div className="ChonMon_list">
        {
          dsLoai.length !== 0 ?
          dsLoai.map((item, index) => {
            return <div className="ChonMon_item" key={index}>
              <MonTheoLoai idloaisanpham={item.id} tenloaisanpham={item.ten} />
            </div>;
          }) : ''
        }
        </div>
      </div>
    </div>
  );
}

export default ChonMon;
