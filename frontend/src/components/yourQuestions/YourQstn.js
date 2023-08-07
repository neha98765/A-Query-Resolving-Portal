import React, { useEffect,useContext } from 'react'
import questionContext from "../../context/Question"
import Spinner from '../Spinner/Spinner';
import YourQstnItem from './YourQstnItem';
import "../../App.css"

export default function YourQstn() {
    const { fetchUserQstns,userQstns,loading,setUserQstns, darkmode } = useContext(questionContext);
    useEffect(()=>{
        fetchUserQstns();
        return ()=>{
            setUserQstns([])
        }
        // eslint-disable-next-line
    },[])
    return (
        <>
            <div className="user-questions-container">
                {loading && <Spinner />}
                {
                    userQstns && userQstns.length>0 && !loading?
                    userQstns.map((qstn)=>{
                        return <YourQstnItem key={qstn._id} qstn={qstn} qstnId={qstn._id} />
                    }):!loading&&<div className={`no_asked_qstn  && ${darkmode && 'title-dark'}`}>No Questions Asked</div>
                }
            </div>
        </>
    )
}
