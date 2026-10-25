// Filename - App.js

import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import Footer from "./components/Footer.jsx";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Home from "./pages";
import Projects from "./pages/projects.jsx";
import Team from "./pages/team";
import ScrollToTop from "./components/ScrollToTop";

const Khipu = lazy(() => import("./pages/khipu"));

// Pages that fill the whole window, with no navbar or footer.
const FULLSCREEN_PATHS = ["/khipu"];

export const SkipLink = styled.a`
    position: absolute;
    left: 16px;
    top: 16px;
    z-index: 100;
    padding: 12px 16px;
    background: var(--ink);
    color: var(--page);
    font-family: var(--sans);
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    border-radius: 4px;
    transform: translateY(-200%);
    transition: transform 0.15s ease;

    &:focus {
        outline: 3px solid var(--focus-ring);
        outline-offset: 2px;
    }

    &:focus,
    &:focus-visible {
        transform: translateY(0);
    }
`;

export const PageWrapper = styled.main`
    flex: 1;
    width: 100%;
`;

/*
 * useLocation only works inside <Router>, and App is what creates the Router.
 * So the part that needs to know the current page lives in this component,
 * which App renders inside the Router.
 */
function Layout() {
    const location = useLocation();
    const fullscreen = FULLSCREEN_PATHS.includes(location.pathname);

    return (
        <>
            <ScrollToTop />
            {!fullscreen && <SkipLink href="#main-content">Skip to main content</SkipLink>}
            {!fullscreen && <Navbar />}
            <PageWrapper id="main-content" tabIndex={-1}>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/index" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/team" element={<Team />} />
                    <Route
                        path="/khipu"
                        element={
                            <Suspense fallback={null}>
                                <Khipu />
                            </Suspense>
                        }
                    />
                </Routes>
            </PageWrapper>
            {!fullscreen && <Footer />}
        </>
    );
}

function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;