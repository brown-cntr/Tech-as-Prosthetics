import React, { useState } from "react";
import { Nav, NavLink, NavMenu, NavImgLink, LogoFrame, LogoImage, ThemeButton } from "./NavbarElements";
import logo from "../../assets/cntr-logo.png";
import { toggleTheme } from "../../theme.js";

const iconProps = {
    width: "38.1689",
    height: "38.1689",
    viewBox: "0 0 38.1689 38.1689",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    style: { display: "block" },
};

const MoonIcon = () => (
    <svg {...iconProps}>
        <path d="M38.1689 20.8037C37.8346 24.4209 36.4771 27.8681 34.2551 30.7419C32.0332 33.6157 29.0388 35.7973 25.6222 37.0314C22.2057 38.2655 18.5083 38.501 14.9628 37.7104C11.4173 36.9199 8.17022 35.1359 5.60159 32.5673C3.03295 29.9986 1.24898 26.7516 0.458411 23.2061C-0.332157 19.6605 -0.0966207 15.9632 1.13746 12.5466C2.37154 9.13008 4.55312 6.13565 7.42694 3.91373C10.3007 1.6918 13.7479 0.334274 17.3651 0C15.2474 2.86507 14.2283 6.39508 14.4932 9.94801C14.7582 13.5009 16.2896 16.8407 18.8088 19.36C21.3281 21.8793 24.6679 23.4107 28.2209 23.6756C31.7738 23.9406 35.3038 22.9215 38.1689 20.8037Z" fill="currentColor"/>
    </svg>
);

const SunIcon = () => {
    const center = 19.08445;
    return (
        <svg {...iconProps}>
            <circle cx={center} cy={center} r="7" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                {Array.from({ length: 8 }, (_, index) => (
                    <line
                        key={index}
                        x1={center}
                        y1="2.1"
                        x2={center}
                        y2="9.1"
                        transform={`rotate(${index * 45} ${center} ${center})`}
                    />
                ))}
            </g>
        </svg>
    );
};

const Navbar = () => {
    const [theme, setTheme] = useState(
        () => document.documentElement.dataset.theme === "dark" ? "dark" : "light"
    );
    const isDark = theme === "dark";

    const onToggleTheme = () => {
        setTheme(toggleTheme());
    };

    return (
        <Nav>
            <NavImgLink to="/index">
                <LogoFrame>
                    <LogoImage src={logo} alt="Technologies and/as Prosthetics" />
                </LogoFrame>
            </NavImgLink>
            <NavMenu>
                <NavLink to="/projects">
                    Experiences
                </NavLink>
                <NavLink to="/team">
                    Team
                </NavLink>
                <ThemeButton
                    type="button"
                    onClick={onToggleTheme}
                    aria-pressed={isDark}
                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {isDark ? <SunIcon /> : <MoonIcon />}
                </ThemeButton>
            </NavMenu>
        </Nav>
    );
};

export default Navbar;
