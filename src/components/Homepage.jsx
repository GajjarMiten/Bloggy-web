import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
    selectSignedIn,
    setSingedIn,
    setUserData,
} from "../features/userSlice";

import "../styles/homepage.css";


const Homepage = () => {
    const dispatch = useDispatch();

    const login = (e) => {
        dispatch(setSingedIn(true));
        dispatch(setUserData(e.profileObj));
    };

    const isSignedIn = useSelector(selectSignedIn);

    return (
        <div
            className="home__page"
            style={{ display: isSignedIn ? "none" : null }}
        >
            {!isSignedIn ? (
                <div className="login__message">
                    <h2>📗</h2>
                    <h1>A Readers favourite place!</h1>
                    <p>
                        We provide high quality online resource for reading
                        logs. Just sign up and start reading some quality blogs.
                    </p>
                    <GoogleLogin
                        clientId={import.meta.env.VITE_G_TOKEN}
                        render={(props) => {
                            return (
                                <button
                                    onClick={props.onClick}
                                    disabled={props.disabled}
                                    className="login__button"
                                >
                                    Login with Google
                                </button>
                            );
                        }}
                        onSuccess={login}
                        onFailure={login}
                        isSignedIn={true}
                        cookiePolicy="single_host_origin"
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Homepage;
