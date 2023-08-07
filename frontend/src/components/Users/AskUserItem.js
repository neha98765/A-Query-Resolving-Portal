import React,{ useContext } from 'react'
import questionContext from "../../context/Question"
import user from './user.png'
import { useNavigate } from 'react-router-dom'
import '../../App.css'


export default function AskUserItem(props) {
    let navigate = useNavigate();
    const { setUserId,darkmode } = useContext(questionContext);
   
    const handleModal = (e)=>{
        const token = localStorage.getItem('token');
        if (!token) {
            e.preventDefault();
            navigate("/login");
        }
        else
        {
            setUserId(props.askuser._id);
            const modal = document.querySelector(".modal-background");
            const visibility = modal.getAttribute('data-visible');
            if (visibility === "true") {
                modal.setAttribute("data-visible", false);
            }
            else if(visibility === "false"){
                modal.setAttribute("data-visible", true);
            }  
        }
    }
    return (
        <>
            <div className={`student_item ${darkmode && 'bg-dark'}`}>
                <div className="stud_info">
                    <img src={props.askuser.profile_pic || user} alt="" />
                    <div className="name_badge">
                        <h3 className={`stud_name ${darkmode && 'title-dark'}`}>{props.askuser.username}</h3>
                    </div>
                </div>
                <button onClick={handleModal}>Ask</button>
            </div>
        </>
    )
}
