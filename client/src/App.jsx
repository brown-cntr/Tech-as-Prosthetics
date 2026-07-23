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
import Projects from "./pages/projects";
import Team from "./pages/team";
import ScrollToTop from "./components/ScrollToTop";

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
                        <Route
                            path="/projects"
                            element={<Projects />}
                        />
                        <Route path="/team" element={<Team />} />
                    </Routes>
                </PageWrapper>
            <Footer />
        </Router>
    );
}

export default App;