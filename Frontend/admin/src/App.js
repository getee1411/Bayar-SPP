import React, { Component } from 'react'
import {Switch, Route} from "react-router-dom"
import Spp from "./pages/SPP"
import Kelas from "./pages/Kelas"
import Siswa from "./pages/Siswa"
import Petugas from "./pages/Petugas"
import History from "./pages/History"
import Pembayaran from "./pages/Pembayaran"
import Login from "./pages/Login"
import Home from "./pages/Home"

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/spp" component={Spp}/>
        <Route path="/kelas" component={Kelas}/>
        <Route path="/siswa" component={Siswa}/>
        <Route path="/petugas" component={Petugas}/>
        <Route path="/login" component={Login}/>
        <Route path="/pembayaran" component={Pembayaran}/>
        <Route path="/history" component={History}/>
      </Switch>
    )
  }
}