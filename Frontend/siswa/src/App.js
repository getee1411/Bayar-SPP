import React, { Component } from 'react'
import {Switch, Route} from "react-router-dom"
import Kelas from "./pages/Kelas"
import Login from "./pages/Login"
import Siswa from "./pages/Siswa"
import Home from "./pages/Home"
import History from "./pages/History"

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/kelas" component={Kelas}/>
        <Route path="/siswa" component={Siswa}/>
        <Route path="/history" component={History}/>
        <Route path="/login" component={Login}/>
      </Switch>
    )
  }
}