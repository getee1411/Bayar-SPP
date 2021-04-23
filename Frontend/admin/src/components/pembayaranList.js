import React, { Component } from 'react'

export default class TransactionsList extends Component {
  constructor() {
    super()
    this.state = {
      level: localStorage.getItem("level")
    }
  }

  convertTime = (time) => {
    let date = new Date(time)
    return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
  }
  render() {
    return (
      <div className="container">
        {/* list */}
        <div className="card col-12 my-1">
          <div className="card-body row">
            <div className="col-lg-2 col-sm-12">
              <small className="text-info">Siswa</small>
              <h6>{this.props.nama_siswa}</h6>
            </div>
            <div className="col-lg-2 col-sm-12">
              <small className="text-info">Tanggal Bayar</small>
              <h6>{this.convertTime(this.props.time)}</h6>
            </div>
            <div className="col-lg-2 col-sm-12">
              <small className="text-info">Total Bayar</small>
              <h6 className="text-danger">Rp. {this.props.total}</h6>
            </div>
            <div className="col-lg-2 col-sm-12">
              <small className="text-info">Petugas</small>
              <h6>{this.props.nama_petugas}</h6>
            </div>
            <div className="col-lg-2 col-sm-12">
              
              {this.state.level === 'admin' ? (
                <div>
                  <button className="btn btn-block btn-sm m-1 btn-success" data-toggle="modal"
                  data-target={`#modalDetail${this.props.id_pembayaran}`}>
                  Details
                  </button>
                  <button className='btn btn-sm btn-primary m-1 px-4' onClick={this.props.onEdit}> Edit </button>
                  <button className="btn btn-sm btn-danger m-1" onClick={this.props.onDrop}> Delete </button>
                </div>
              ) : (<button className="btn btn-block btn-sm my-3 btn-success" data-toggle="modal"
              data-target={`#modalDetail${this.props.id_pembayaran}`}>
              Details
              </button>)}
            </div>
          </div>
        </div>
        <div className="modal fade" id={`modalDetail${this.props.id_pembayaran}`}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5>Detail of Transaction</h5>
              </div>
              <div className="modal-body">
                <h5>Siswa:{this.props.nama_siswa} </h5>
                <h6>Time:{this.props.time} </h6>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ID Petugas</th>
                      <th>Bulan Dibayar</th>
                      <th>Tahun Dibayar</th>
                      <th>ID SPP</th>
                      <th>Total Bayar</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr key={this.props.key}>
                        <td>{this.props.index}</td>
                        <td>{this.props.id_petugas}</td>
                        <td>{this.props.bulan_dibayar}</td>
                        <td>{this.props.tahun_dibayar}</td>
                        <td>{this.props.id_spp}</td>
                        <td>{this.props.total}</td>
                      </tr>
                    <tr>
                      <td colSpan="5" className="text-danger text-bold">
                        <h4>Total</h4>
                      </td>
                      <td className="text-right text-danger text-bold">
                        <h4>Rp. {this.props.total} </h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}