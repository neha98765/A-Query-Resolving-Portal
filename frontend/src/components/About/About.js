import React, { useContext } from 'react'
import './About.css'
import questionContext from '../../context/Question'
export default function About() {
  const {darkmode}=useContext(questionContext);
  return (
    <div className='about_container'>
        <div className={`about_title   ${darkmode && 'title-dark'}`}>
            <span>About</span>
            <hr />
        </div>
        <div className={`about_text  ${darkmode && 'bg-input-dark'}`}>
          <span><b>Query Resolving Portal</b></span><br></br>
            Query Resolving Portal is a community driven web application to help students to clear their queries and doubts. Students and teachers can register on this platform and they can ask their questions. They can also give answer to other user`s questions. This platform includes additional features like answer requesting, reward system, notification system, profile page etc. User can also able to update their profile picture by going to the profile page. This Portal is also user friendly, as User can also enable Dark Mode whenever they want.
            Thankyou and happy helping!!!
        </div>   
    </div>
  )
}
