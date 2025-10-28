import { useState, useEffect } from "react";
import { layDs } from "../../../services/LoaiSanPhamAPI.js";
import { layDsSanPhamPhoBien } from "../../../services/SanPhamAPI.js";
import MonTheoLoai from "./MonTheoLoai";
import "./ChonMon.css";
import MonNoiBat from "./MonNoiBat/index.js";

function ChonMon() {
  const [dsLoai, setDsLoai] = useState([]);
  const [popularDishs, setPopularDishs] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await layDs();
      const dataPopularDishs = await layDsSanPhamPhoBien();
      if (!data.dsLoaiSanPham || !dataPopularDishs.dsSanPhamPhoBien) 
      {
        
        console.log("error lay danh sach loai");
      } 
      else 
      {
        setDsLoai(data.dsLoaiSanPham);
        setPopularDishs(dataPopularDishs.dsSanPhamPhoBien);
      }
    })();
  }, []);

  return (
    <div className="ChonMon">
      <div className="ChonMon_content">
        <h2 className="ChonMon_header">PURETASTE KITCHEN KÍNH CHÀO QUÝ KHÁCH</h2>
        <div className="ChonMon_list">
        <MonNoiBat />
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
