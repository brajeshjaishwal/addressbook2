import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { NavLink } from 'react-router-dom'

const noAuthHeader = 
    <div className="ui three item menu">
        <NavLink className="item" activeClassName="active" exact to = "/">CONTACT BOOK</NavLink>
        <NavLink className="item" activeClassName="active" exact to = "/Login" >Login</NavLink>
        <NavLink className="item" activeClassName="active" exact to = "/Register" >Register</NavLink>
    </div>

const authHeader =  
    <div className="ui three item menu">
        <NavLink className="item" activeClassName="active" exact to = "/">CONTACT BOOK</NavLink>
        <NavLink className="item" activeClassName="active" exact to = "/Quiz/Create" >Create Quiz</NavLink>
        <NavLink className="item" activeClassName="active" exact to = "/Quiz" >Quiz list</NavLink>
    </div>

const Navbar = () => {
    var user = sessionStorage.getItem('name')
    return user ? authHeader : noAuthHeader
}

export default Navbar