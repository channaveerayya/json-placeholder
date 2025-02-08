import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import NavBar from "./components/NavBar";

const Posts = React.lazy(() => import("./pages/Posts"));
const Photos = React.lazy(() => import("./pages/Photos"));

const App: React.FC = () => (
    <Provider store={store}>
        <Router>
            <NavBar />
            <Suspense fallback={<p>Loading...</p>}>
                <Routes>
                    <Route path="/" element={<Posts />} />
                    <Route path="/photos" element={<Photos />} />
                </Routes>
            </Suspense>
        </Router>
    </Provider>
);

export default App;
