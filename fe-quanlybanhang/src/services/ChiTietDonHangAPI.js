import axios from "axios";
import { api } from "./config";

export const taoChiTiet = async ({ iddonhang, idsanpham, soluong }) => {
  try {
    const response = await axios.post(`${api}/chitietdonhang/taoChiTiet`, {
      iddonhang,
      idsanpham,
      soluong,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const layChiTietTheoDon = async ({ iddonhang }) => {
    try {
      const response = await axios.post(`${api}/chitietdonhang/layChiTietTheoDon`, {
        iddonhang
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
