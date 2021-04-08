import React from "react"
import Navbar from "../components/Navbar"
import { base_url } from "../config.js";
import KelasList from "../components/kelasList"
import $ from "jquery"
import axios from "axios"

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            kelas:[],
            token:"",
            action:"",
            id_kelas:"",
            nama_kelas:"",
            kompetensi_keahlian:""
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
    getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({kelas: response.data})
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
        this.getKelas()
    }
    Add = () => {
        $("#modal_product").modal("show")
        this.setState({
            action: "insert",
            id_kelas: 0,
            nama_kelas: "",
            kompetensi_keahlian:""
        })
    }
    Edit = selectedItem => {
        //console.log(selectedItem)
        $("#modal_product").modal("show")
        this.setState({
            action: "update",
            id_kelas: selectedItem.id_kelas,
            nama_kelas: selectedItem.nama_kelas,
            kompetensi_keahlian: selectedItem.kompetensi_keahlian
        })
        //console.log(this.state.id_kelas)
    }
    saveKelas = event => {
        event.preventDefault()
        $("#modal_product").modal("hide")
        let data = {
            "id_kelas": this.state.id_kelas,
            "nama_kelas": this.state.nama_kelas,
            "kompetensi_keahlian": this.state.kompetensi_keahlian}

        let url = base_url + "/kelas"
        if (this.state.action === "insert") {
            axios.post(url, data, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getKelas()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, data, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getKelas()
            })
            .catch(error => console.log(error))
        }
    }
    dropkelas = selectedItem => {
        if (window.confirm("are you sure will delete this data?")) {
            let url = base_url + "/kelas/" + selectedItem.id_kelas
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getKelas()
            })
            .catch(error => console.log(error))
        }
    }
    render(){
        return(
            <div>
               <Navbar />
               <div className="container">
                   <h3 className="text-bold text-info mt-2">Classroom</h3>
                   <div className="row">
                       { this.state.kelas.map( item => (
                           <KelasList
                           id_kelas = {item.id_kelas}
                           nama_kelas = {item.nama_kelas}
                           kompetensi_keahlian = {item.kompetensi_keahlian}
                           onEdit = {() => this.Edit(item)}
                           onDrop = {() => this.dropkelas(item)}
                            />
                       )) }
                   </div>
                   <button className="btn btn-success" onClick={() => this.Add()}>
                       Add New
                   </button>
                </div>

                 {/* modal product  */}
                 <div className="modal fade" id="modal_product">
                     <div className="modal-dialog">
                         <div className="modal-content">
                             <div className="modal-header bg-info text-white">
                                 <h4>Form Classroom</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.saveKelas(ev)}>
                                     CLASSNAME
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nama_kelas}
                                     onChange={ev => this.setState({nama_kelas: ev.target.value})}
                                     required
                                     />

                                     KOMPETENSI KEAHLIAN
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.kompetensi_keahlian}
                                     onChange={ev => this.setState({kompetensi_keahlian: ev.target.value})}
                                     required
                                     />
                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                    </button>
                                 </form>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
        )
    }
}
