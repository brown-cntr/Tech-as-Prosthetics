import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: var(--nav);
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
    padding: 0 36px;
    box-sizing: border-box;

    @media screen and (max-width: 800px) {
        padding: 0 16px;
    }
`;

export const NavLink = styled(Link)`
    color: var(--ink);
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 4px;
    margin: -4px;
    height: auto;
    cursor: pointer;
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    white-space: nowrap;
    border-radius: 4px;

    &:focus-visible {
        outline: 3px solid var(--focus-ring);
        outline-offset: 2px;
    }
`;

export const NavImgLink = styled(Link)`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    border-radius: 4px;

    &:focus-visible {
        outline: 3px solid var(--focus-ring);
        outline-offset: 2px;
    }
`;

export const LogoFrame = styled.span`
    position: relative;
    width: 60px;
    height: 60px;
    overflow: hidden;
    flex-shrink: 0;
`;

export const LogoImage = styled.img`
    position: absolute;
    width: 116.13%;
    height: 110.6%;
    left: -6.45%;
    top: -5.3%;
    max-width: none;
`;

export const NavMenu = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 80px;
    padding: 10px;

    @media screen and (max-width: 800px) {
        gap: 24px;
        padding: 10px 0;
    }
`;

export const ThemeButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 51px;
    height: 51px;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    flex-shrink: 0;
    border-radius: 4px;

    &:focus-visible {
        outline: 3px solid var(--focus-ring);
        outline-offset: 2px;
    }
`;
