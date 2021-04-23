import React from "react"
import Navbar from "../components/Navbar"
import $ from "jquery"
import axios from "axios"
import { base_url } from "../config.js";

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            pembayaran:[],
            token:"",
            action:"",
            id_pembayaran:"",
            id_petugas:"",
            nisn:"",
            tgl_bayar:"",
            bulan_dibayar:"",
            tahun_dibayar:"",
            id_spp: "",
            jumlah_bayar: ""
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getPembayaran = () => {
        let url = base_url + "/pembayaran"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({pembayaran: response.data})
        })
        .catch(error => {
            if (error.response) {
                if(error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    componentDidMount(){
        this.getPembayaran()
    }
    Add = () => {
        $("#modal_product").modal("show")
        this.setState({
            action: "insert",
            id_pembayaran:0,
            id_petugas:0,
            nisn:"",
            tgl_bayar:"",
            bulan_dibayar:"",
            tahun_dibayar:"",
            id_spp: 0,
            jumlah_bayar: 0
        })
    }
    Edit = selectedItem => {
        this.setState({
            action: "update",
            id_pembayaran: selectedItem.id_pembayaran,
            id_petugas: selectedItem.id_petugas,
            nisn: selectedItem.nisn,
            tgl_bayar:selectedItem.tgl_bayar,
            bulan_dibayar:selectedItem.bulan_dibayar,
            tahun_dibayar:selectedItem.tahun_dibayar,
            id_spp:selectedItem.id_spp,
            jumlah_bayar:selectedItem.jumlah_bayar
        })
        //console.log(this.state.id_kelas)
    }
    savePembayaran = event => {
        event.preventDefault()
        $("#modal_product").modal("hide")
        let form = new FormData()
        form.append("id_pembayaran", this.state.id_pembayaran)
        form.append("id_petugas", this.state.id_petugas)
        form.append("nisn", this.state.nisn)
        form.append("tgl_bayar", this.state.tgl_bayar)
        form.append("bulan_dibayar", this.state.bulan_dibayar)
        form.append("tahun_dibayar", this.state.tahun_dibayar)
        form.append("id_spp", this.state.id_spp)
        form.append("jumlah_bayar", this.state.jumlah_bayar)
        let url = base_url + "/pembayaran"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPembayaran()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPembayaran()
            })
            .catch(error => console.log(error))
        }
    }
    render(){
        return(
            <div>
                <Navbar />
                <div className="container d-flex h-100 justify-content-center align-items-center">
                <div className="col-sm-8 card my-5">
                    <div className="card-header bg-dark text-white text-center">
                        <h4>PEMBAYARAN</h4>
                        <strong className="text-warning">SPP</strong>
                    </div>
                    <div className="card-body" onSubmit = {ev => this.Add(ev)}>
                    <form onSubmit={ev => this.savePembayaran(ev)}> 
                    <h6 className="text-dark">
                                     ID Petugas: <input type="number" className="form-control mb-1"
                                     value={this.state.id_petugas}
                                     onChange={ev => this.setState({id_petugas: ev.target.value})}
                                     required/></h6>
                                     
                    <h6 className="text-dark">
                                     NISN: <input type="text" className="form-control mb-1"
                                     value={this.state.nisn}
                                     onChange={ev => this.setState({nisn: ev.target.value})}
                                     required/></h6>

                    <h6 className="text-dark">
                                     No. SPP: <input type="number" className="form-control mb-1"
                                     value={this.state.id_spp}
                                     onChange={ev => this.setState({id_spp: ev.target.value})}
                                     required/></h6>

                    <h6 className="text-dark">
                                     Bayar Bulan: <input type="text" className="form-control mb-1"
                                     value={this.state.bulan_dibayar}
                                     onChange={ev => this.setState({bulan_dibayar: ev.target.value})}
                                     required/></h6>

                    <h6 className="text-dark">
                                     Tahun: <input type="text" className="form-control mb-1"
                                     value={this.state.tahun_dibayar}
                                     onChange={ev => this.setState({tahun_dibayar: ev.target.value})}
                                     required/></h6>

                    <h6 className="text-dark">
                                     Tanggal Bayar: <input type="date" className="form-control mb-1"
                                     value={this.state.tgl_bayar}
                                     onChange={ev => this.setState({tgl_bayar: ev.target.value})}
                                     required/></h6>
                    
                    <h6 className="text-dark">
                                     Total: <input type="number" className="form-control mb-1"
                                     value={this.state.jumlah_bayar}
                                     onChange={ev => this.setState({jumlah_bayar: ev.target.value})}
                                     required/></h6>

                            <button className="btn btn-block btn-dark mb-1 text-warning" type="submit"> 
                                Bayar
                    </button>
                    </form>        
                    </div>
                </div>
            </div>
            </div>
        )
    }
}