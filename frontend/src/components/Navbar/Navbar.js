import React, { useEffect, useContext } from 'react'
import './Navbar.css'
import questionContext from "../../context/Question"
import { useNavigate } from 'react-router-dom';
import icon from './user-icon.png';
import { Link } from "react-router-dom";
import AskQstn from '../Ask Question/AskQstn';

export default function Navbar() {
    const { fetchNotify, notifyCount, editNotify, isLogin, setIsLogin,fetchProfile,profile } = useContext(questionContext);
    let navigate = useNavigate();
    const handleLogout = (e) => {
        setIsLogin(false)
        localStorage.clear("token");
        e.preventDefault();
        navigate("/");
    }
    const handleLogin = () => {
        navigate("/login");
    }
    const handleSignup = () => {
        navigate("/signup");
    }
    const handleSidebar = () => {
        const sidebar = document.querySelector(".sidebar");
        const visibility = sidebar.getAttribute('data-visible');
        if (visibility === "false") {
            sidebar.style.zIndex=10
            sidebar.setAttribute("data-visible", true);
            const overlay = document.querySelector("#overlay");
            overlay.classList.add("active");
        }
        else if (visibility === "true") {
            sidebar.setAttribute("data-visible", false);
        }
    }
    const handleModalClose = ()=>{
        const modal = document.querySelector(".askqstn_elements");
        const overlay = document.querySelector("#overlay");
        const sidebar = document.querySelector(".sidebar");
        modal.classList.remove("active");
        overlay.classList.remove("active");
        sidebar.setAttribute("data-visible", false);

    }
    const handleNotify = () => {
        editNotify();
        navigate("/notify");
    }
    const handleUserDropdown = () => {
        const dlist = document.querySelector(".dropdown-list");
        const visibility = dlist.getAttribute('data-visible');
        if (visibility === "true") {
            dlist.setAttribute("data-visible", false);
        }
        else if (visibility === "false") {
            dlist.setAttribute("data-visible", true);
        }
    }
    useEffect(() => {
        isLogin && fetchNotify();
        isLogin && fetchProfile();
        // eslint-disable-next-line
    }, [isLogin])
    return (
        <>
        <AskQstn />
            <nav>
                <div className="nav-content">
                    <i className="fas fa-bars menu-bar" data-visible="false" onClick={handleSidebar}></i>
                    <h1 className="logo">QR Portal</h1>
                    <div className="menu-items">
                        <i className="fas fa-home"></i>
                        <Link to="/questions/1">Home</Link>
                        <Link to="/about">About</Link>
                    </div>
                    <div className="right-content">
                        {isLogin &&
                            <div className="profile-pic" onClick={handleUserDropdown}>
                                <img src={profile?profile.profile_pic:icon} alt="" />
                                <div className="dropdown-list" data-visible="false" >
                                    <i className="fas fa-caret-down"></i>
                                    <div className="dropdown-list-item"><Link to="/profile">Profile</Link></div>
                                    <div className="dropdown-list-item"><a href="/questions/1" onClick={handleLogout}>Logout</a></div>
                                </div>
                            </div>
                        }
                        {isLogin &&
                            <div className="bell-icon" onClick={handleNotify}>
                                <div className="badge">
                                    <span>{notifyCount}</span>
                                </div>
                                <i className="fas fa-bell"></i>
                            </div>
                        }

                        <div className="right-buttons">
                            {!isLogin &&
                                <>
                                
                                    <button onClick={handleLogin} className='login-btn'>Login</button>
                                    <button onClick={handleSignup} className='signup-btn'>Signup</button>
                                </>
                            }
                        </div>

                    </div>
                </div>
            </nav>
            <div id="overlay" onClick={handleModalClose}></div>
        </>
    )
}
