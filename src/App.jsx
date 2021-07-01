import React from "react";
import { useSelector } from "react-redux";
import Blogspage from "./components/Blogspage";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import { selectSignedIn } from "./features/userSlice";

import "./styles/app.css";

const App = () => {
    const isSignedIn = useSelector(selectSignedIn);

    return (
        <>
            <Navbar />
            <Homepage />
            {isSignedIn && <Blogspage />}
        </>
    );
};

export default App;
