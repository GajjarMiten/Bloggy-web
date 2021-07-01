import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
    selectSignedIn,
    selectUserData,
    setInput,
    setSingedIn,
    setUserData,
} from "../features/userSlice";

import "../styles/navbar.css";

const Navbar = () => {
    const isSignedIn = useSelector(selectSignedIn);
    const userData = useSelector(selectUserData);

    const [input, setSearchInput] = useState("tech");

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(setInput(input));
    };
    const logout = () => {
        dispatch(setSingedIn(false));
        dispatch(setUserData(null));
    };

    return (
        <nav className="navbar">
            <h1 className="navbar__header">Bloggy 💬</h1>
            {isSignedIn && (
                <div className="blog__search">
                    <input
                        className="search"
                        placeholder="Search for a blog"
                        value={input}
                        onChange={(e) => setSearchInput(e.target.value)}
                    ></input>
                    <button className="submit" onClick={handleClick}>
                        Search
                    </button>
                </div>
            )}
            {isSignedIn ? (
                <div className="navbar__user__data">
                    <Avatar
                        src={userData?.imageUrl}
                        alt={userData?.name}
                        className="user"
                    />
                    <h1 className="signedIn">{userData?.givenName}</h1>
                    <GoogleLogout
                        clientId={process.env.G_TOKEN}
                        onLogoutSuccess={logout}
                        render={(props) => {
                            return (
                                <button
                                    onClick={props.onClick}
                                    disabled={props.disabled}
                                    className="logout__button"
                                >
                                    Logout 👋
                                </button>
                            );
                        }}
                    />
                </div>
            ) : (
                <h1 className="notSignedIn">User not available 😥</h1>
            )}
        </nav>
    );
};

export default Navbar;
