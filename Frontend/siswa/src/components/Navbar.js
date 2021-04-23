import React from "react"
import {Link} from "react-router-dom"
export default class Navbar extends React.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("siswa")
        window.location = "/login"
    }
    render(){
        return(
            <div className="navbar navbar-expand-lg bg-dark navbar-dark">
                <a className="navbar-brand">
                    E-Payment
                </a>

                {/* show and hide menu */}
                <button className="navbar-toggler" data-toggle="collapse"
                data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* menu */}
                <div id="menu" className="navbar-collapse collpase">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                HOME
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/kelas" className="nav-link">
                                CLASS
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/siswa" className="nav-link">
                                STUDENT
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/history" className="nav-link">
                                HISTORY
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => this.Logout()}>
                                LOGOUT
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}