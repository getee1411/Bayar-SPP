import React from "react"
import Navbar from "../components/Navbar"
import { base_url } from "../config.js";
import SppList from "../components/sppList"
import $ from "jquery"
import axios from "axios"

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            spp:[],
            token:"",
            action:"",
            id_spp:"",
            tahun:"",
            nominal:""
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
    getSpp = () => {
        let url = base_url + "/spp"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({spp: response.data})
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
        this.getSpp()
    }
    Add = () => {
        $("#modal_product").modal("show")
        this.setState({
            action: "insert",
            id_spp: 0,
            tahun: "",
            nominal:""
        })
    }
    Edit = selectedItem => {
        //console.log(selectedItem)
        $("#modal_product").modal("show")
        this.setState({
            action: "update",
            id_spp: selectedItem.id_spp,
            tahun: selectedItem.tahun,
            nominal: selectedItem.nominal
        })
        //console.log(this.state.id_kelas)
    }
    saveSpp = event => {
        event.preventDefault()
        $("#modal_product").modal("hide")
        let data = {
            "id_spp": this.state.id_spp,
            "tahun": this.state.tahun,
            "nominal": this.state.nominal}

        let url = base_url + "/spp"
        if (this.state.action === "insert") {
            axios.post(url, data, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSpp()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, data, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSpp()
            })
            .catch(error => console.log(error))
        }
    }
    dropSpp = selectedItem => {
        if (window.confirm("are you sure will delete this data?")) {
            let url = base_url + "/spp/" + selectedItem.id_spp
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getSpp()
            })
            .catch(error => console.log(error))
        }
    }
    render(){
        return(
            <div>
               <Navbar />
               <div className="container">
                   <h3 className="text-bold text-info mt-2">SPP</h3>
                   <div className="row">
                       { this.state.spp.map( item => (
                           <SppList
                           id_spp = {item.id_spp}
                           tahun = {item.tahun}
                           nominal = {item.nominal}
                           onEdit = {() => this.Edit(item)}
                           onDrop = {() => this.dropSpp(item)}
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
                                 <h4>Form SPP</h4>
                             </div>
                             <div className="modal-body">
                                 <form onSubmit={ev => this.saveSpp(ev)}>
                                     Tahun
                                     <input type="number" className="form-control mb-1"
                                     value={this.state.tahun}
                                     onChange={ev => this.setState({tahun: ev.target.value})}
                                     required
                                     />

                                     nominal
                                     <input type="number" className="form-control mb-1"
                                     value={this.state.nominal}
                                     onChange={ev => this.setState({nominal: ev.target.value})}
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
