import React from 'react';
import { NavLink } from "react-router-dom";

const navStyle = {
    color: '#00d2d3'
};

const NavBar = () => (
    <div class="sidebar-header">
        <nav className="navbar navbar-dark bg-dark">
            <h3 style={navStyle}>BUDA Bar</h3>
            <NavLink className="text-white" to="/">Inicio</NavLink>
            <NavLink className="text-white" to="/orders">Ventas</NavLink>
            <NavLink className="text-white" to="/categories">Categorias</NavLink>
            <NavLink className="text-white" to="/products">Productos</NavLink>
            <NavLink className="text-white" to="/operations">Cortes</NavLink>
            <NavLink className="text-white" to="/tables">Mesas</NavLink>
            <NavLink className="text-white" to="/registers">Cajas</NavLink>
            <NavLink className="text-white" to="/users">Usuarios</NavLink>
            <NavLink className="text-white" to="/logout">Salir</NavLink>
        </nav>
    </div>
);

export { NavBar };