import { React,useState,useContext } from 'react'
import questionContext from "../../context/Question"
import { useLocation,useParams,useNavigate } from 'react-router-dom';
import "./Update.css"
export default function UpdateQstn() {
    let navigate = useNavigate()
    let { qstnId } = useParams()
    const { state } = useLocation()
    const { updateQuestion,darkmode , setAlert} = useContext(questionContext);
    const [qstnDetails,setQstnDetails] = useState({
        title:state.qstn.title,
        description:state.qstn.description,
        visibility:state.qstn.visibility
    });
    const handleSubmitQstn = async (e)=>{
      e.preventDefault();
      if(qstnDetails.title && qstnDetails.description && qstnDetails.visibility)
      {
        if(qstnDetails.title.length>=5 && qstnDetails.description.length>=5){
          await updateQuestion(qstnDetails,qstnId);
          navigate('/yourqstn')
          setAlert({msg:"Question updated successfully...",
        active:true,
        type:2
           });
      }
    }
      else{
        setAlert({msg:"You cannot edit this...", active:true});
      }
     
    }
    const handleFormChange = (e)=>{
      setQstnDetails({
        ...qstnDetails,
        [e.target.name]:e.target.name==="visibility"?parseInt(e.target.value):e.target.value
      })
    }
    return (
      <>
        <div className="updateqstn_container login-con">
          <div className={`updateqstn_elements ${darkmode && 'bg-dark'}`}>
            <div className={`update-title ${darkmode && 'title-dark'}`}>Update Question</div>
            <form action="#">
              <div className="input_box">
                <span className={`${darkmode && 'title-dark'}`}>Question</span>
                <input className={`${darkmode && 'bg-input-dark'}`} type="text" name='title' value={qstnDetails.title} placeholder='Enter the question' required onChange={handleFormChange} />
              </div>
              <div className={`input_box ${darkmode && 'title-dark'}`}>
                <span>Description</span>
                <textarea className={`${darkmode && 'bg-input-dark'}`} name="description" id="" cols="40" rows="10" value={qstnDetails.description} required placeholder='Enter the description' onChange={handleFormChange}></textarea>
              </div>
              <div className={`visibility_details ${darkmode && 'title-dark'}`}>
                <span className="v_title">Visibility</span>
                <input type="radio" id="public" name="visibility" checked={qstnDetails.visibility===3?true:false} value={3} required onChange={handleFormChange} />
                <label htmlFor="public" className={`${darkmode && 'title-dark'}`}>Public</label><br />
                <input type="radio" id="teachers_only" name="visibility" checked={qstnDetails.visibility===1?true:false} value={1} required onChange={handleFormChange} />
                <label htmlFor="teachers_only" className={`${darkmode && 'title-dark'}`}>Teachers</label><br />
                <input type="radio" id="students_only" name="visibility" checked={qstnDetails.visibility===0?true:false} value={0} required onChange={handleFormChange} />
                <label htmlFor="students_only" className={`${darkmode && 'title-dark'}`}>Students</label>
              </div>
              <button type='submit' className='submit_btn_qstn' onClick={handleSubmitQstn}>Update</button>
            </form>
          </div>
        </div>
      </>
    )
  }
