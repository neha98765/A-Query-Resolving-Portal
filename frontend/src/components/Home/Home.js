import { useEffect, useContext } from 'react'
import { useLocation,useParams,useNavigate } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import './Home.css'
import questionContext from "../../context/Question"
import QuestionItem from './QuestionItem';
import Pagination from '../Pagination/Pagination';
function Home() {
    const navigate = useNavigate();
    const { pageNum } = useParams();
    const location = useLocation();
    const { fetchQstns,questions,page,setPage,pages,setQuestions,loading,darkmode} = useContext(questionContext);
    
    const handleAskQstn = (e)=>{
        const token = localStorage.getItem('token');
        if (!token) {
            e.preventDefault();
            navigate("/login");

        }else{
            const modal = document.querySelector(".askqstn_elements");
            const overlay = document.querySelector("#overlay");
            modal.classList.add("active");
            overlay.classList.add("active");
        }

    }
    useEffect(() => {
        if(isNaN(pageNum))
        {
            return navigate('/error');
        }
        fetchQstns(parseInt(pageNum));
        return ()=>{
            setQuestions([])
        }
        // eslint-disable-next-line
    }, [page,location])

    return (
        <>
            <div className="contents">
                <div className={`question-header ${darkmode && 'header-dark'}`}>
                    <h1 className={`${darkmode && 'dark-h1'}`}>All Questions</h1>
                    <button onClick={handleAskQstn} className='ask-btn' style={{ marginLeft: 20 }}>Ask Question</button>
                </div>
                {!loading && parseInt(pageNum)>pages?<div style={{margin:"10px 10px"}}>Page not available</div>:<Pagination page={page} pages={pages} changePage={setPage} />}
                <div className="content-container">
                {loading && <Spinner />}
                
                {
                    questions?questions.map((qstn) => {
                        return <QuestionItem key={qstn._id} qstn={qstn} qstnId={qstn._id} />
                    }):<div className='no_questions'>No Questions</div>
                }
                </div>
                {parseInt(pageNum)>pages && questions?"":<Pagination page={page} pages={pages} changePage={setPage} />}
            </div>
        </>
    )
}

export default Home
