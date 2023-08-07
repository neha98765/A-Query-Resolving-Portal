import React, { useContext } from 'react'
import parse from 'html-react-parser'
import './AnswerItem.css'
import questionContext from "../../context/Question"
import user from './user.png'
export default function AnswerItem(props) {
    const { idUser,deleteAnswer,darkmode } = useContext(questionContext);
   
    const deleteAns = async ()=>{
        await deleteAnswer(props.ans._id);
    }
    return (
        <div className="answer dpm ans-item">
            <div className={`answer_question_details ${darkmode && 'bg-dark'}`}>
                    <div className="author_details">
                        <img src={props.ans.user.profile_pic?props.ans.user.profile_pic:user} alt="" />
                        <div className="author_details_nb">
                            <span className={`author_username ${darkmode && 'title-dark'}`}>{props.ans.user.username}</span>
                            {/* <span className="author_badge" style={badgeStyle}>{fullBadge.badge}</span> */}
                        </div>
                        {props.ans.user._id===idUser?<i className={`far fa-trash-alt del_btn ${darkmode && 'title-dark'}`} onClick={deleteAns}></i>:<></>}
                    </div>
                    <div className={`answer_of_qstn_item ${darkmode && 'subtitle-dark'}`}>
                        {parse(props.ans.answer)}
                    </div>
                </div>
            
        </div>
    )
}
