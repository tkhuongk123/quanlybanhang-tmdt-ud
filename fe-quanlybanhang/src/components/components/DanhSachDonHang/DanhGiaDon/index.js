import { useEffect, useState } from "react";
import "./DanhGiaDon.css";
import { Input } from "antd";
import { Select } from "antd";
import { layNgayGio } from "../../../../utils/ngayGio";
import { danhGia, layDanhGiaTheoId } from "../../../../services/DanhGiaAPI";
import { NotifyError, NotifySuccess } from "../../Toast";
const { TextArea } = Input;
const { Option } = Select;

function DanhGiaDon(props) {
  const [danhGiaGet, setDanhGiaGet] = useState("");
  const [diem, setDiem] = useState("5");

  useEffect(() => {
    (async() => {
      const data = await layDanhGiaTheoId({iddonhang: props.iddonhang})
      if(data.danhGia) {
        setDanhGiaGet(data.danhGia)
      }
    })()
  }, [props])

  const Submit = async () => {
    const diemdanhgia = parseInt(diem);
    const noidung = document.querySelector(".DanhGiaDon_form-textarea").value;
    const idmanguoidung = props.idmanguoidung;
    const iddonhang = props.iddonhang;
    const ngay = layNgayGio();

    const data = danhGia({
      idmanguoidung,
      noidung,
      diemdanhgia,
      ngay,
      iddonhang,
    });
    if (data.error) {
      NotifyError(data.error);
    } else {
      setDanhGiaGet({ idmanguoidung, iddonhang, diemdanhgia, noidung, ngay });
      NotifySuccess("Đánh giá thành công");
    }
  };

  return (
    <div
      className="DanhGiaDon"
      onClick={(e) => {
        if (e.target.className === "DanhGiaDon") {
          props.setChiTietDonHang("");
        }
      }}
    >
      <div className="DanhGiaDon_content">
        <h3>Đánh giá</h3>
        <form className="DanhGiaDon_form">
          <h3>Mức độ</h3>
          <Select
            className="DanhGiaDon_form-select"
            defaultValue={danhGiaGet ? danhGiaGet.diemdanhgia : "5"}
            disabled={danhGiaGet ? true : false}
            onChange={(value) => {
              setDiem(value);
            }}
          >
            <Option value="5">
              <div className="DanhGiaDon_form-option">
                <p>Rất hài lòng</p>
                <i className="fa-solid fa-face-kiss-wink-heart"></i>
              </div>
            </Option>
            <Option value="4">
              <div className="DanhGiaDon_form-option">
                <p>Dịch vụ tốt</p>
                <i className="fa-solid fa-face-laugh-wink"></i>
              </div>
            </Option>
            <Option value="3">
              <div className="DanhGiaDon_form-option">
                <p>Cũng tạm được</p>
                <i className="fa-solid fa-face-laugh-beam"></i>
              </div>
            </Option>
            <Option value="2">
              <div className="DanhGiaDon_form-option">
                <p>Không hài lòng</p>
                <i className="fa-solid fa-face-frown"></i>
              </div>
            </Option>
            <Option value="1">
              <div className="DanhGiaDon_form-option">
                <p>Rất không hài lòng</p>
                <i className="fa-solid fa-face-dizzy"></i>
              </div>
            </Option>
          </Select>

          <h3>Nhận xét</h3>
          {danhGiaGet ? (
            <TextArea
              rows={4}
              placeholder="Nhập nội dung tại đây..."
              className="DanhGiaDon_form-textarea"
              value={danhGiaGet.noidung}
              disabled={true}
            />
          ) : (
            <TextArea
              rows={4}
              placeholder="Nhập nội dung tại đây..."
              className="DanhGiaDon_form-textarea"
            />
          )}
          <button
            disabled={danhGiaGet ? true : false}
            className="DanhGiaDon_form-submit"
            onClick={(e) => {
              Submit();
            }}
          >
            Đánh giá
          </button>
        </form>
      </div>
    </div>
  );
}

export default DanhGiaDon;
