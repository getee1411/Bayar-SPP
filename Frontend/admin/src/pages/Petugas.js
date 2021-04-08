import React from "react"
import Navbar from "../components/Navbar"
import { base_url, admin_image_url } from "../config.js";
import PetugasList from "../components/petugasList"
import $ from "jquery"
import axios from "axios"

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            petugas:[],
            token:"",
            action:"",
            id_petugas:"",
            nama_petugas:"",
            username:"",
            password:"",
            level:"",
            image:"",
            uploadFile: true,
            fillPassword: true
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
    getPetugas = () => {
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({petugas: response.data})
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
        this.getPetugas()
    }
    Add = () => {
        $("#modal_product").modal("show")
        this.setState({
            action: "insert",
            id_petugas: 0,
            nama_petugas: "",
            username: "",
            password: "",
            image: null,
            level:"",
            fillPassword: true,
            uploadFile: true
        })
    }
    Edit = selectedItem => {
        //console.log(selectedItem)
        $("#modal_product").modal("show")
        this.setState({
            action: "update",
            id_petugas: selectedItem.id_petugas,
            nama_petugas: selectedItem.nama_petugas,
            username: selectedItem.username,
            password: "",
            image: null,
            level:selectedItem.level,
            fillPassword: false,
            uploadFile: false
        })
        //console.log(this.state.id_kelas)
    }
    savePetugas = event => {
        event.preventDefault()
        $("#modal_product").modal("hide")
        let form = new FormData()
        form.append("id_petugas", this.state.id_petugas)
        form.append("nama_petugas", this.state.nama_petugas)
        form.append("level", this.state.level)
        form.append("username", this.state.username)
        if (this.state.uploadFile) {
            form.append("image", this.state.image)
        }

        if (this.state.fillPassword) {
            form.append("password", this.state.password)
        }
        let url = base_url + "/petugas"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        }
    }
    dropPetugas = selectedItem => {
        if (window.confirm("are you sure will delete this data?")) {
            let url = base_url + "/petugas/" + selectedItem.id_petugas
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPetugas()
            })
            .catch(error => console.log(error))
        }
    }
    render(){
        return(
            <div>
               <Navbar />
               <div className="container">
                   <h3 className="text-bold text-info mt-2">Agent</h3>
                   <div className="row">
                       { this.state.petugas.map( item => (
                           <PetugasList
                           id_petugas = {item.id_petugas}
                           nama_petugas = {item.nama_petugas}
                           level = {item.level}
                           image = { admin_image_url + "/" + item.image}
                           onEdit = {() => this.Edit(item)}
                           onDrop = {() => this.dropPetugas(item)}
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
                                 <h4>Form Petugas</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.savePetugas(ev)}>
                                     Nama
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.nama_petugas}
                                     onChange={ev => this.setState({nama_petugas: ev.target.value})}
                                     required
                                     />

                                     Username
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.username}
                                     onChange={ev => this.setState({username: ev.target.value})}
                                     required
                                     />

                                     Otoritas
                                     <input type="text" className="form-control mb-1"
                                     value={this.state.level}
                                     onChange={ev => this.setState({level: ev.target.value})}
                                     required
                                     />

                                    { this.state.action === "update" && this.state.uploadFile === false ? (
                                        <button className="btn btn-sm btn-dark mb-1 btn-block"
                                        onClick={() => this.setState({uploadFile: true})}>
                                            Change Petugas Image
                                        </button>
                                    ) : (
                                        <div>
                                            Petugas Image
                                            <input type="file" className="form-control mb-1"
                                            onChange={ev => this.setState({image: ev.target.files[0]})}
                                            required
                                            />
                                        </div>
                                    ) }

                                    { this.state.action === "update" && this.state.fillPassword === false ? (
                                        <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                        onClick={() => this.setState({fillPassword: true})}>
                                            Change Password
                                        </button>
                                    ) : (
                                        <div>
                                            Password
                                            <input type="password" className="form-control mb-1"
                                            value={this.state.password}
                                            onChange={ev => this.setState({password: ev.target.value})}
                                            required
                                            />
                                        </div>
                                    ) }

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
