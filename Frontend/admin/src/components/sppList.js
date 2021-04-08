import React from "react"

export default class kelasList extends React.Component{
    render(){
        return (
            <div className="col-lg-6 col-sm-11 p-1">
                <div className="card">
                    <div className="card-body row">
                        {/* menampilkan deskripsi */}
                        <div className="col-7">
                            <h5 className="text-info">
                                ID: { this.props.id_spp }
                            </h5>
                            <h6 className="text-danger">
                                Tahun: { this.props.tahun}
                            </h6>
                            <h6 className="text-dark">
                                Nominal: { this.props.nominal}
                            </h6>
                            </div>
                    <div className="col-sm-5">
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

