import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";


export const Nav = styled.nav`
    background: #F2F0E9;
    width: 100%;
    height: 10vh;
    display: flex;
    flex-direction: row;
    align-items: right;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
    padding: 0 1rem;
    justify-content: space-between;
`;

export const NavLink = styled(Link)`
    color: #000000;
    display: flex;
    text-decoration: none;
    padding: 0.5rem 1.5rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: #b6a3c0;
    }
`;

export const NavImgLink = styled(Link)`
    display: flex;
    justify-content: left;
    width: 5%;
    height: 100%;
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
`;

// export const Space = styled.div`
//     width: 200px;
//     height: 80px;
// `;