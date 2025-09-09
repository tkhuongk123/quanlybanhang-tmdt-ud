import TraDon from "../../components/ChucNang/TraDon"

function Bep_TraDon() {
    const nguoidung = JSON.parse(sessionStorage.getItem('nguoidung'))

    return (
        <main className="Bep_TraDon">
            <TraDon nguoidung={nguoidung} option='21'/>
        </main>
    )
}

export default Bep_TraDon
