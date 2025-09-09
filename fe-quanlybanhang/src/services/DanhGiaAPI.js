import axios from "axios";
import { api } from "./config";

export const layDsDanhGia = async () => {
  try {
    const response = await axios.get(`${api}/danhgia/layDsDanhGia`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const layDanhGiaTheoId = async ({ iddonhang }) => {
  try {
    const response = await axios.post(`${api}/danhgia/layDanhGiaTheoId`, {
      iddonhang,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const danhGia = async ({
  idmanguoidung,
  noidung,
  diemdanhgia,
  ngay,
  iddonhang,
}) => {
  try {
    const response = await axios.post(`${api}/danhgia/danhGia`, {
      idmanguoidung,
      noidung,
      diemdanhgia,
      ngay,
      iddonhang,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
