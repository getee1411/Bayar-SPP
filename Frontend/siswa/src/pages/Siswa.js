import React from "react"
import Navbar from "../components/Navbar"
import { base_url, siswa_image_url } from "../config.js";
import SiswaList from "../components/siswaList"
import $ from "jquery"
import axios from "axios"
export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            siswa:[],
            token:"",
            action:"",
            nisn:"",
            nis:"",
            nama:"",
            id_kelas:"",
            kelas:{},
            alamat: "",
            no_telp:"",
            id_spp:"",
            spp:{},
            username:"",
            password:"",
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
    getSiswa = () => {
        let url = base_url + "/siswa"
        axios.get(url, this.headerConfig())
        .then(response=> {
            this.setState({siswa: response.data})
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
        this.getSiswa()
    }

    render(){
        return(
            <div>
               <Navbar />
               <div className="container">
                   <h3 className="text-bold text-info mt-2">Student</h3>
                   <div className="row">
                       { this.state.siswa.map( item => (
                           <SiswaList
                           nisn = {item.nisn}
                           nis = {item.nis}
                           nama = {item.nama }
                           id_kelas = {item.id_kelas}
                           alamat = {item.alamat}
                           no_telp = {item.no_telp}
                           id_spp = {item.id_spp}
                           image = { siswa_image_url + "/" + item.image}
                            />
                       )) }
                   </div>
                </div>
            </div>
        )
    }
}