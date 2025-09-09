import validation from "../../../utils/validation";
import { NotifyError, NotifyWarning } from "../../components/Toast";
import "./DangNhap.css";
import {LoginAPI} from "../../../services/TaiKhoanAPI";

function DangNhap() {

    const login = async() => {
        const tenDangNhapE = document.getElementById('tendangnhap')
        const matKhauE = document.getElementById('matkhau')
        
        if(validation(tenDangNhapE) && validation(matKhauE)) {
            const tendangnhap = tenDangNhapE.value.trim();
            const matkhau = matKhauE.value.trim();
            const data = await LoginAPI({tendangnhap, matkhau})

            if(data.taiKhoan) {
                sessionStorage.setItem('nguoidung', JSON.stringify(data.taiKhoan))
                if(data.taiKhoan.idquyen === 0) {
                    window.location.href = "/nhanvien/nhandon"
                } else if(data.taiKhoan.idquyen === 1) {
                    window.location.href = "/quanly/donhang"
                } else if(data.taiKhoan.idquyen === 2) {
                    window.location.href = "/bep/nhandon"
                } else {
                    window.location.reload()
                }
            } else {
                NotifyError(data.error)
            }
        } else {
            NotifyWarning('Vui lòng nhập thông tin đầy đủ')
        }
    }

    return (
        <div className="DangNhap">
            <div className="DangNhap_main">
                <h2>Đăng nhập</h2>
                <form className="DangNhap_form" onSubmit={(e) => {
                    e.preventDefault();
                    login();
                }}>
                    <input id="tendangnhap" type="text" placeholder="Tên đăng nhập"/>
                    <input id="matkhau" type="password" placeholder="Mật khẩu"/>

                    <div className="DangNhap_option">
                        <div className="DangNhap_option-nhoMatKhau">
                            <input id="nhomatkhau" type="checkbox"/>
                            <label htmlFor="nhomatkhau">Nhớ mật khẩu</label>
                        </div>
                        <div className="DangNhap_option-quenMatKhau">
                            <span>Quên mật khẩu?</span>
                        </div>
                    </div>  

                    <button type="submit">Đăng nhập</button>
                </form> 
            </div>
        </div>
    )
}

export default DangNhap