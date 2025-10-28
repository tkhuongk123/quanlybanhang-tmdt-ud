import axios from "axios";
import { api } from "./config";

export const taoDonHang = async ({
  idmanguoidung,
  trangthai,
  thanhtoan,
  tongtien,
  tongsanpham,
  ngay,
  diachi,
  ghichu,
}) => {
  try {
    const response = await axios.post(`${api}/donhang/taoDonHang`, {
      idmanguoidung,
      trangthai,
      thanhtoan,
      tongtien,
      tongsanpham,
      ngay,
      diachi,
      ghichu,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const layDanhSach = async () => {
  try {
    const response = await axios.get(`${api}/donhang/layDanhSach`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const layTongSoTienVaDonHangTheoThang = async ({month, year}) => {
  try {
    const response = await axios.get(`${api}/donhang/layTongSoTienVaDonHangTheoThang`, {
      params: { month, year }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const layDanhSachTheoId = async ({ idmanguoidung }) => {
  try {
    const response = await axios.post(`${api}/donhang/layDanhSachTheoId`, {
      idmanguoidung,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const capNhatDonHang = async ({ id, trangthai, ghichu }) => {
  try {
    const response = await axios.post(`${api}/donhang/capNhatDonHang`, {
      id,
      trangthai,
      ghichu,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
