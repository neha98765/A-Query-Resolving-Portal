import React, { useEffect, useContext } from 'react'
import questionContext from "../../context/Question"
import Spinner from '../Spinner/Spinner';
import YourAnswerItem from './YourAnswerItem';
import "../../App.css"

export default function YourAnswer() {
    const { fetchUserAnsQstn,userAnsQstns,loading,setUserAnsQstns, darkmode} = useContext(questionContext);
    useEffect(() => {
        fetchUserAnsQstn();
        
        return ()=>{
            setUserAnsQstns([])
            // eslint-disable-next-line
        }
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="user-questions-container">
            {loading && <Spinner /> }
                {
                    userAnsQstns.length>0?
                    userAnsQstns.map((ansQstn) => {
                        return <YourAnswerItem key={ansQstn._id} ansQstn={ansQstn} ansQstnId={ansQstn.question._id} />
                    }):!loading&&<div className={`no_answered_qstn && ${darkmode && 'subtitle-dark'}`}>No Questions Answered</div>
                }
            </div>
        </>
    )
}
