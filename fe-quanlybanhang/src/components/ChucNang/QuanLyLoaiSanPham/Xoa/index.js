import { xoa } from "../../../../services/LoaiSanPhamAPI";
import { NotifyError, NotifySuccess } from "../../../components/Toast";
import "./Xoa.css";

function Xoa(props) {

    function handleCancel() {
        props.setChucNang('')
    }

    const handleOk = async() => {
        const data = await xoa({id: props.loaiSanPham.id});
        if(data.error) {
            NotifyError('Xóa loại sản phẩm không thành công')
        } else {
            const newDs = [...props.dsLoaiSanPham];
            newDs.splice(props.index, 1);
            props.setDsLoaiSanPham(newDs)
            NotifySuccess(`Xóa loại sản phẩm thành công`)
            props.setChucNang('')
        }
        
    }

  return (
    <div className="Xoa" onClick={(e) => {
        if(e.target.className === "Xoa") {
            props.setChucNang('')
        }
    }}>
      <div className="Xoa_content">
        <h2>Thông báo</h2>
        <p>Bạn có chắc chắn muốn xóa '{props.loaiSanPham.ten}'</p>
        <div>
        <button className="Xoa_content-cancel" onClick={handleCancel}>Hủy</button>
        <button className="Xoa_content-ok" onClick={handleOk}>Đồng ý</button>
        </div>
      </div>
    </div>
  );
}

export default Xoa;
