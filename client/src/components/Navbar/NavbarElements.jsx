import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: #b3edff;
    width: 200px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 12;
    padding: 1rem 0;
`;

export const NavLink = styled(Link)`
    color: #000000;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 1rem 1.5rem;
    height: auto;
    width: 100%;
    cursor: pointer;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    &.active {
        color: #4d4dff;
    }
    &:hover {
        background: rgba(0,0,0,0.05);
    }
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #808080;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 0;
`;