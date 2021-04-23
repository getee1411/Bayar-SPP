import React from "react"

export default class historyList extends React.Component{
    render(){
        return (
            <div className="col-lg-6 col-sm-12 p-1">
                <div className="card">
                    <div className="card-body row">
                        {/* menampilkan deskripsi */}
                        <div className="col-7">
                            <h5 className="text-info">
                            ID: { this.props.id_pembayaran }
                            </h5>

                            <h6 className="text-danger">
                            ID Petugas: { this.props.id_petugas}
                            </h6>
                            
                            <h6 className="text-dark">
                            NISN: { this.props.nisn}
                            </h6>

                            <h6 className="text-dark">
                            No. SPP: { this.props.id_spp}
                            </h6>

                            <h6 className="text-dark">
                            Bayar Bulan: { this.props.bulan_dibayar}
                            </h6>

                            <h6 className="text-dark">
                            Bayar Tahun: { this.props.tahun_dibayar}
                            </h6>

                            <h6 className="text-dark">
                            Tanggal Bayar: { this.props.tgl_bayar}
                            </h6>

                            <h6 className="text-dark">
                            Jumlah: { this.props.jumlah_bayar}
                            </h6>

                            </div>
                    </div>
                </div>
            </div>
        )
    }
}