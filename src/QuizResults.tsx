import { useNavigate } from "react-router-dom";
import { ActionsNames, useQuizQuizDispatcher, useQuizState } from "./QuizContext";
import QuizDetails from "./QuizDetails";
import { useEffect, useState } from "react";


function QuizResults(){
    const {data} = useQuizState();
    const dispach = useQuizQuizDispatcher();
    const navigate = useNavigate()
    const [scored , setScored]=useState(0);
    useEffect(()=>{
        let scored=0;
        data.forEach(i =>{
            if (i.answers.some(a=> a.selected && a.index === i.correctAnswerdIndex))
                scored++;
        })
        setScored(scored);
    },[data]);
    
    function onButtonClick()
    {
        dispach({type:ActionsNames.Clear});
        navigate('/');
 
    }
    function getScoreBg(score:number):string
    {
        if (score < 2)
            return "m-2 score-red";
        else if(score < 4)
            return "m-2 score-yellow";
        else
        return "m-2 score-green";
    }

    return(
        <div className="m-3">
            <h1>RESULTS</h1>
            <QuizDetails readOnly={true}/>
            <div className={getScoreBg(scored)}>
                <p className="text-center">You scored {scored} out of 5</p>
            </div>
            <div className="d-grid gap-2">
                <button className="btn btn-secondary" type="button"
                onClick={onButtonClick}>Create a new quiz</button>
            </div>
    </div>
    );
}

export default QuizResults;