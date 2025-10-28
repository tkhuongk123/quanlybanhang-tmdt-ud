import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, ConfigProvider } from 'antd';
import { Users, ChefHat, Utensils, TrendingUp, Calendar } from "lucide-react";
import { layDsSanPhamPhoBien, tongSanPham } from '../../../services/SanPhamAPI'; 
import { tongLoaiSanPham } from '../../../services/LoaiSanPhamAPI'; 
import { tongTaiKhoan } from '../../../services/TaiKhoanAPI'; 
import formatPrice from '../../../utils/formatPrice';
import styles from './QuanLyThongKe.module.css';
import { layTongSoTienVaDonHangTheoThang } from '../../../services/DonHangAPI';



function QuanLyThongKe() {
    const startYear = 2020;
    const currentYear = new Date().getFullYear();

    const [stats, setStats] = useState({
        total_users: 0,
        total_dishs: 0,
        total_type_dishs: 0
    });
    const [popularDishs, setPopularDishs] = useState([]);
    const [time, setTime] = useState({
        month: 1,
        year: new Date().getFullYear(),
    });
    const [thongKe, setThongKe] = useState({
        tong_tien: 0,
        tong_donhang: 0
    });
    
    const years = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => startYear + i
    );

    useEffect(() => {
        (async () => {
            try {
                const [dataTongTaiKhoan, dataTongSanPham, dataTongLoaiSanPham, dataPopularDishs] =
                    await Promise.all([tongTaiKhoan(), tongSanPham(), tongLoaiSanPham(), layDsSanPhamPhoBien()]);
                
                setStats({
                    total_users: dataTongTaiKhoan.tongTaiKhoan,
                    total_dishs: dataTongSanPham.tongSanPham,
                    total_type_dishs: dataTongLoaiSanPham.tongLoaiSanPham
                });
                setPopularDishs(dataPopularDishs.dsSanPhamPhoBien);
            } 
            catch (error) 
            {
                console.error("Lỗi khi load dashboard:", error);
            }
        })();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const dataTongTienVaDonHang = await layTongSoTienVaDonHangTheoThang({month: time.month, year: time.year});
            if(dataTongTienVaDonHang.dsDonHang) {
                setThongKe({
                    tong_tien: dataTongTienVaDonHang.dsDonHang[0].tong_tien, 
                    tong_donhang: dataTongTienVaDonHang.dsDonHang[0].tong_donhang
                });
            }
        };
        fetchData();
    }, [time]);

    const handleChangeTime = async (e) => {
        const { name, value } = e.target;
        // Ghi đè 1 phần giá trị của một state object
        setTime((prev) => ({
            ...prev,
            [name]: Number(value), 
        }));
    };

  

  return (
    <div className={styles.QuanLyThongKe}>
        <div className={styles.HeaderCards} style={{ marginTop: 20 }}>
            <Card
                title="Món ăn phổ biến"
                extra={<TrendingUp 
                    style={{
                        color: '#40bc69'
                    }}
                />}
            >
                <div className={styles.PopularDish}>
                    {popularDishs && popularDishs.map((dish) => (
                        <div key={dish.id} className={styles.Dish}>
                            <span className={styles.DishName}>{dish.ten}</span>
                            <span className={styles.OrderQuantity}>{dish.so_don_hang} đơn</span>
                        </div>
                    ))}
                    
                </div>
            </Card>
            <Card
                title="Tổng số người dùng"
                extra={<Users 
                    style={{
                        color: '#fa8431'
                    }}
                />}
            >
                {stats.total_users}
            </Card>
            <Card
                title="Tổng số món ăn"
                extra={<ChefHat 
                    style={{
                        color: '#fa8431'
                    }}
                />}
            >
                {stats.total_dishs}
            </Card>
            <Card
                title="Tổng số loại món ăn"
                extra={<Utensils
                    style={{
                        color: '#fa8431'
                    }}
                />}
            >
                {stats.total_type_dishs}
            </Card>
            
        </div>       

        <div className={styles.ChooseTime}>
            <Card
                title="Chọn Thời Gian Xem Thống Kê"
                extra={<Calendar 
                    style={{
                        color: '#fa8431'
                    }}
                />}
            >
                <select  
                    name="month"
                    className={styles.SelectCustome}
                    value={time.month}
                    onChange={handleChangeTime}
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            Tháng {i + 1}
                        </option>
                    ))}
                </select>
                <select 
                    name="year"
                    className={styles.SelectCustome} 
                    style={{marginLeft: '15px'}}
                    value={time.year}
                    onChange={handleChangeTime}
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            Năm {year}
                        </option>
                    ))}
                </select>
            </Card>
        </div> 

        <div className={styles.BodyCards}>
            <Card title={`Doanh thu tháng ${time.month} năm ${time.year}`}>
                <div className={styles.TotalParams}>
                    <span
                        style={{
                            color: '#ea580c',
                            fontSize: '38px',
                            fontWeight: '700'
                        }}
                    >
                        {formatPrice(thongKe.tong_tien)}
                    </span>
                    <span
                        style={{
                            fontSize: '16px'
                        }}
                    >
                        Tổng doanh thu
                    </span>
                </div>
            </Card>
            <Card title={`Đơn hàng tháng ${time.month} năm ${time.year}`}>
                <div className={styles.TotalParams}>
                    <span
                        style={{
                            color: '#ea580c',
                            fontSize: '38px',
                            fontWeight: '700'
                        }}
                    >
                        {thongKe.tong_donhang}
                    </span>
                    <span
                        style={{
                            fontSize: '16px'
                        }}
                    >
                        Tổng đơn hàng
                    </span>
                </div>
            </Card>
        </div>
    </div>
  );
}

export default QuanLyThongKe;
