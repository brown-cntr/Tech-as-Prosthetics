import React from "react";
import { Nav, NavLink, NavMenu, Logo, Space } from "./NavbarElements";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../assets/logo-with-name.png";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Logo src={logo} alt="Logo" />
                <NavMenu>
                    <NavLink to="/index" activeStyle>
                        HomePage
                    </NavLink>
                    <NavLink to="/projects" activeStyle>
                        Projects
                    </NavLink>
                    <NavLink to="/team" activeStyle>
                        Team
                    </NavLink>
                </NavMenu>
                <Space></Space>
            </Nav>
        </>
    );
};

export default Navbar;