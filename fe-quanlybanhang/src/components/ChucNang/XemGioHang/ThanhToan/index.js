import formatPrice from "../../../../utils/formatPrice";
import "./ThanhToan.css";
import { taoDonHang } from "../../../../services/DonHangAPI";
import { taoChiTiet } from "../../../../services/ChiTietDonHangAPI";
import { layNgayGio } from "../../../../utils/ngayGio";
import { Select } from "antd";
import { NotifyError, NotifySuccess } from "../../../components/Toast";

const { Option } = Select;

function ThanhToan(props) {
  const thanhToan = async () => {
    const nguoidung = JSON.parse(sessionStorage.getItem("nguoidung"));
    const ngay = layNgayGio();
    const thanhtoan = 1;
    const trangthai = 30;
    const tongtien = props.tongTien;
    const tongsanpham = props.tongSanPham;
    const idmanguoidung = nguoidung.id;
    const ghichu = "";
    const data = await taoDonHang({
      idmanguoidung,
      trangthai,
      thanhtoan,
      tongtien,
      tongsanpham,
      ngay,
      ghichu,
    });
    if (data.error) {
      NotifyError(data.error);
    } else {
      const iddonhang = data.id;
      for (let x of props.dsSanPham) {
        const idsanpham = x.id;
        const soluong = x.soluong;
        taoChiTiet({ iddonhang, idsanpham, soluong });
      }

      NotifySuccess("Thanh toán thành công");
      localStorage.removeItem("giohang");
      props.setThanhToan("");
      props.setDsSanPham([]);
    }
  };

  return (
    <div
      className="ThanhToan"
      onClick={(e) => {
        if (e.target.className === "ThanhToan") {
          props.setThanhToan("");
        }
      }}
    >
      <div className="ThanhToan_content">
        <div className="ThanhToan_content-info">
          <div>
            <p>
              Đơn hàng: <span>{props.tongSanPham} sản phẩm</span>
            </p>
          </div>
          <div>
            <p>
              Tổng tiền: <span>{formatPrice(props.tongTien)} </span>
            </p>
            <p>Đã bao gồm phí VAT</p>
          </div>
        </div>
        <div className="ThanhToan_content-phuongthuc">
          <h3>Phương thức thanh toán</h3>
          <Select
            className="ThanhToan_content-phuongthuc-list"
            defaultValue="1"
          >
            <Option value="1">
              <div className="ThanhToan_content-phuongthuc-item">
                <p>Thanh toán qua VNPAY</p>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/vnpay.png`}
                  alt="vn-pay"
                  className="ThanhToan_content-phuongthuc-img"
                />
              </div>
            </Option>
            <Option value="2">
              <div className="ThanhToan_content-phuongthuc-item">
                <p>Thanh toán qua Momo</p>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/momo.png`}
                  alt="momo"
                  className="ThanhToan_content-phuongthuc-img"
                />
              </div>
            </Option>
            <Option value="3">
              <div className="ThanhToan_content-phuongthuc-item">
                <p>Thanh toán qua Ngân hàng</p>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/mb.png`}
                  alt="mb-bank"
                  className="ThanhToan_content-phuongthuc-img"
                />
              </div>
            </Option>
          </Select>
        </div>
        <div className="ThanhToan_content-control">
          <button
            className="ThanhToan_content-control-access"
            onClick={() => {
              thanhToan();
            }}
          >
            Thanh toán {formatPrice(props.tongTien)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThanhToan;
