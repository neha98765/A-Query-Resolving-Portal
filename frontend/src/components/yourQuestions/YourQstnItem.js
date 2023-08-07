import {React,useContext} from 'react'
import "./YourQstn.css"
import user from './user.png'
import questionContext from "../../context/Question"
import { Link, useNavigate } from 'react-router-dom';


export default function YourQstnItem(props) {
  const { deleteQuestion,darkmode } = useContext(questionContext);
  let navigate = useNavigate()
    const updatedAgoFinder = ()=>{
        const date_diff = new Date(new Date()-new Date(props.qstn.updatedAt));
        const min = Math.round(date_diff.getTime()/(1000*60))||0;
        const hrs = Math.round(date_diff.getTime()/(1000*60*60));
        const days = Math.round(date_diff.getTime()/(1000*60*60*24));
        const months = Math.round(date_diff.getTime()/(1000*60*60*24*31));
        if(months>0)
        {
            return {type:"mo",val:months};
        }
        else if(days>0)
        {
            return {type:"d",val:days};
        }
        else if(hrs>0)
        {
            return {type:"h",val:hrs};
        }
        else if(min>0)
        {
            return {type:"min",val:min};
        }
        else{
            return {type:"just now"}
        }
    }
    const handleDelete = async()=>{
        await deleteQuestion(props.qstn._id);
    }
    const handleUpdate = async()=>{
         navigate(`/updateqstn/${props.qstn._id}`,{ state: { qstn: props.qstn } })
    }
    return (
        <>
            <div className={`user-question ${darkmode && 'bg-dark'}`}>
                <div className="user_details">
                    <img src={props.qstn.user.profile_pic || user} alt="" />
                    <div className="user_text">
                        <h2 className={`${darkmode && 'title-dark'}`}>{props.qstn.user.username}</h2>
                        <span className={`${darkmode && 'subtitle-dark'}`}>updated {updatedAgoFinder().val||""}{updatedAgoFinder().type}</span>
                    </div>
                    <div className="control_options">
                        <i  onClick={handleUpdate} className={`far fa-edit ${darkmode && 'title-dark'}`}></i>
                        <i className={`far fa-trash-alt ${darkmode && 'title-dark'}`}  onClick={handleDelete}></i>
                    </div>
                </div>
                <div className="question_details">
                    <Link to={`/answers/${props.qstnId}`}><h2 className={`${darkmode && 'title-dark'}`}>{props.qstn.title}</h2></Link>
                    <p className={`${darkmode && 'desc-dark'}`}>{props.qstn.description}</p>
                </div>
            </div>
        </>
    )
}
