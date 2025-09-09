import "./ThongTinSanPham.css";
import formatPrice from "../../../utils/formatPrice";

function ThongTinSanPham(props) {

  return (
    <div className="ThongTinSanPham">
      {props.item ? (
        <div className="ThongTinSanPham_content">
          <div className="ThongTinSanPham_content-img">
            <img
              src={`${process.env.PUBLIC_URL}/assets/hinhSanPham/${props.item.id}.jpg`}
              alt="props.item"
            />
          </div>
          <div className="ThongTinSanPham_content-info">
            <p>{props.item.ten}</p>
            <p>{formatPrice(props.item.dongia)}</p>
          </div>
          <div className="ThongTinSanPham_content-mota">
            <h3>Chi tiết sản phẩm:</h3>
            <p>{props.item.mota}</p>
          </div>
          <div className="ThongTinSanPham_content-tong">
            <p>{formatPrice(props.item.soluong * props.item.dongia)}</p>
          </div>
          <div className="ThongTinSanPham_content-soluong">
            Số lượng: 
            <p>{props.item.soluong}</p>
          </div>
          
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ThongTinSanPham;
