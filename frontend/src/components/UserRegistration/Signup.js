import React, { useContext, useState } from "react";
import "./Signup.css";
import questionContext from "../../context/Question";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, darkmode} = useContext(questionContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    if (
      (userInfo.email.length > 1 &&
        userInfo.password.length >= 5 &&
        userInfo.username.length >= 3 &&
        !userInfo.username) ||
      !userInfo.email ||
      !userInfo.password ||
      !userInfo.role
    ) {
      setError(true);
      return false;
    }

    // if (
    //   userInfo.email.length > 1 &&
    //   userInfo.password.length >= 5 &&
    //   userInfo.username.length >= 3
    // ) {
    //   setError(true);
    //   return false;
    // }
    {
      console.log("here");
      e.preventDefault();
      signup(
        userInfo.username,
        userInfo.email,
        userInfo.password,
        userInfo.role,
        parseInt(userInfo.role)
      ).then((res) => {
        if (res === 0) {
          navigate("/login");
        }
      });
    }
  };
  return (
    <>
      <div className="img-con">
        <div className="signup-container">
          <div className={`signup-elements  ${darkmode && 'bg-dark'}`}>
            <h1 className={`title ${darkmode && 'title-dark'}`}>Signup</h1>
            <div className="username-item signup-item">
              <span className={`title ${darkmode && 'title-dark'}`}>Username</span>
              <input className={`${darkmode && 'bg-input-dark'}`} type="text" name="username" onChange={handleChange} required={true} minLength={3} />
              {error && !userInfo.username && (
                <span className="invalid-input">Enter your Username</span>
              )}
            </div>
            <div className="email-item signup-item">
              <span className={`title ${darkmode && 'title-dark'}`}>Email</span>
              <input className={`${darkmode && 'bg-input-dark'}`} type="email" name="email" onChange={handleChange} required={true} />
              {error && !userInfo.email && (
                <span className="invalid-input">Enter your Email</span>
              )}
            </div>
            <div className="password-item signup-item">
              <span className={`title ${darkmode && 'title-dark'}`}>Password</span>
        <input className={`form-control shadow-none ${darkmode && 'bg-input-dark'}`} type="password" name="password" id="password"  autoComplete="off" value={userInfo.password} onChange={handleChange} required={true} minLength={5}
              />
              {error && !userInfo.password && (
                <span className="invalid-input">Enter your Password</span>
              )}
            </div>
            {/* <div className="password-item signup-item">
            <span>Confirm Password</span>
            <input
              type="password"
              name="cpassword"
              onChange={handleChange}
              required={true}
              minLength={5}
            />
            {error && !userInfo.cpassword && (
              <span className="invalid-input">Enter your Confirm Password</span>
            )}
            </div> */}
            <div className="user_type_select">
              <div className="student_select">
                <input
                  type="radio"
                  id="student"
                  name="role"
                  value={3}
                  required
                  onChange={handleChange}
                />
                <label className={`title ${darkmode && 'title-dark'}`} htmlFor="student">Student</label>
                <br />
              </div>
              <div className="teacher_select">
                <input
                  type="radio"
                  id="teacher"
                  name="role"
                  value={1}
                  required
                  onChange={handleChange}
                />
                <label className={`title ${darkmode && 'title-dark'}`} htmlFor="teacher">Teacher</label>
                <br />
              </div>

              {error && !userInfo.role && (
                <span className="invalid-input ">
                  Please select any one role{" "}
                </span>
              )}
            </div>
            <button onClick={handleSignup}>Signup</button>
          </div>
        </div>
      </div>
    </>
  );
}
