import React, { useContext, useState } from "react";
import "./Login.css";
import questionContext from "../../context/Question";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login, darkmode } = useContext(questionContext);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    if (userInfo.email.length > 1 && userInfo.password.length >= 5) {
      e.preventDefault();
      await login(userInfo.email, userInfo.password);
      navigate("/questions/1");
    }
    console.log(e.target.value);
  };
  return (
    <>
      <div className="bg-image">
        <div className="login-container">
          <div className={`login-elements ${darkmode && 'bg-dark'}`}>
            <h1 className={`title ${darkmode && 'title-dark'}`}>Login</h1>
            <form action="#">
              <div className="email-item login-item">
                <span className={`title ${darkmode && 'title-dark'}`}>Email</span>
                <input  className={`${darkmode && 'bg-input-dark'}`} 
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="password-item login-item">
                <span className={`title ${darkmode && 'title-dark'}`}>Password</span>
                <input  className={`${darkmode && 'bg-input-dark'}`} 
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required={true}
                  minLength={5}
                />
              </div>
              <button onClick={handleLogin}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
