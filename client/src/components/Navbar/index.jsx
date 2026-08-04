import React from "react";
import { Nav, NavLink, NavMenu, NavImgLink} from "./NavbarElements";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../assets/image.png";

const Navbar = () => {
    return (
        <>
            <Nav>
                 <NavImgLink to="/index" activeStyle>
                        <img src= {logo}/>
                    </NavImgLink>
                <NavMenu>
                    <NavLink to="/projects" activeStyle>
                        Projects
                    </NavLink>
                    <NavLink to="/team" activeStyle>
                        Team
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;