import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: #d4d4d4ff;
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
    padding: 0 1rem;
    justify-content: space-between
`;

export const NavLink = styled(Link)`
    color: #000000;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1.5rem;
    height: 100%;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    &.active {
        color: #4d4dff;
        border-bottom: 3px solid #4d4dff;
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
    flex-direction: row;
    margin-right: 0;
`;

export const Logo = styled.img`
    width: 200px;
    height: 80px;
`;

export const Space = styled.div`
    width: 200px;
    height: 80px;
`;