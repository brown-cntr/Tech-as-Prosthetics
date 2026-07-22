// Filename - App.js

import React from "react";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import Footer from "./components/Footer.jsx";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import HomePage from "./pages/index";
import About from "./pages/about";
import Projects from "./pages/projects";
import Team from "./pages/team";
import Workshops from "./pages/workshops";

export const PageWrapper = styled.nav`

`;

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Navbar />
                <PageWrapper>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route
                            path="/index"
                            element={<Home />}
                        />
                        <Route path="/about" element={<About />} />
                        <Route
                            path="/projects"
                            element={<Projects />}
                        />
                        <Route path="/team" element={<Team />} />
                        <Route
                            path="/workshops"
                            element={<Workshops />}
                        />
                    </Routes>
                </PageWrapper>
            <Footer />
        </Router>
    );
}

export default App;