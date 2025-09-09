import TraDon from "../../components/ChucNang/TraDon"

function NV_TraDon() {
    const nguoidung = JSON.parse(sessionStorage.getItem('nguoidung'))

    return (
        <main className="NV_TraDon">
            <TraDon nguoidung={nguoidung} option='11'/>
        </main>
    )
}

export default NV_TraDon
