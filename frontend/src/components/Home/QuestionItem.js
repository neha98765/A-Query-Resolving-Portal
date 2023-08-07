import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './QuestionItem.css'
import user_icon from "./user.png"
import questionContext from "../../context/Question"
import { useNavigate } from 'react-router-dom'

export default function QuestionItem(props) {
    const {darkmode } = useContext(questionContext);
    let navigate = useNavigate();
  

    const handleAnswer = (e)=>{
        const token = localStorage.getItem('token');
        if (!token) {
            e.preventDefault();
            navigate("/login");

        }
    }
   
    return (
        <div className={`card ${darkmode && 'dark'}`}>
            <img className="qstn-img" src="" alt="" />
            <div className="card-block">
                <div className="date-time">
                    <span className={`${darkmode && 'dark-span'}`}>Updated at {new Date(props.qstn.updatedAt).toLocaleDateString()}</span>
                </div>
                <h2 className="card-title"><Link to={`/answers/${props.qstnId}`} className={`${darkmode && 'dark-a'}`}>{props.qstn.title}</Link></h2>
                <h4 className="card-text">
                    {props.qstn.description}
                </h4>
                <div className="answer-content">
                    <div className="ans-num" style={{ marginRight: 30 }}>
                        <span className={`${darkmode && 'dark-span'}`}>{props.qstn.ansnumber} Answers</span>
                    </div>
                    <Link to={`/answers/${props.qstn._id}`} onClick={handleAnswer}>
                        <div className="answer-btn">
                            <i className="far fa-edit" style={{ color: "orange", marginRight: 10 }}></i>
                            <p>Answer</p>
                        </div>
                    </Link>
                </div>
                <div className="card-footer">
                    <div className="author">
                        <Link to={`/user/${props.qstn.user._id}`}><img className="author-thumb" src={props.qstn.user.profile_pic?props.qstn.user.profile_pic:user_icon} alt="" /></Link>
                        <span className="author-details">
                            <span className="author-name"><Link to={`/user/${props.qstn.user._id}`} className={`${darkmode && 'dark-a'}`}>{props.qstn.user.username}</Link></span>
                            
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
