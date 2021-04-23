import React from "react"

export default class petugasList extends React.Component{
    render(){
        return (
            <div className="col-lg-6 col-sm-12 p-1">
                <div className="card">
                    <div className="card-body row">
                    <div className="col-sm-3">
                        {/* image */}
                        <img alt={this.props.name} src={this.props.image} 
                        className="img rounded-circle" width="100" height="100" />
                    </div>
                        {/* menampilkan deskripsi */}
                        <div className="col-7">
                            <h5 className="text-info">
                                NISN: { this.props.nisn }
                            </h5>
                            <h5 className="text-info">
                                NIS: { this.props.nis }
                            </h5>
                            <h6 className="text-danger">
                                Nama: { this.props.nama}
                            </h6>
                            <h6 className="text-dark">
                                Kode Kelas: { this.props.id_kelas}
                            </h6>
                            <h6 className="text-dark">
                                Alamat: { this.props.alamat}
                            </h6>
                            <h6 className="text-dark">
                                No. Telepon: { this.props.no_telp}
                            </h6>
                            <h6 className="text-dark">
                                No. SPP: { this.props.id_spp}
                            </h6>

                            </div>
                    <div className="col-sm-2">
                            {/* button untuk mengedit */}
                            <button className="btn btn-sm btn-primary m-1"
                            onClick={this.props.onEdit}>
                                Edit
                            </button>

                            {/* button untuk menghapus */}
                            <button className="btn btn-sm btn-danger m-1"
                            onClick={this.props.onDrop}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}