import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/index" activeStyle>
                        HomePage
                    </NavLink>
                    <NavLink to="/about" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/projects" activeStyle>
                        Projects
                    </NavLink>
                    <NavLink to="/team" activeStyle>
                        Team
                    </NavLink>
                    <NavLink to="/workshops" activeStyle>
                        Workshops
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;