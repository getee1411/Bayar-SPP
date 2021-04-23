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
                            />
                       )) }
                   </div>
                </div>
            </div>
        )
    }
}