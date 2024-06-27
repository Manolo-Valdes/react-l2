import { useEffect, useState } from "react";
import Selector from "./Selector";
import QuizDetails from "./QuizDetails";
import { ActionsNames, useQuizQuizDispatcher, useQuizState } from "./QuizContext";
import { useNavigate } from "react-router-dom";
import { QuizData } from "./QuizModels";
import { routes } from "./Router";


function QuizMaker()
{
    const navigate = useNavigate()
    const dispach = useQuizQuizDispatcher();
    const {resultAvailable} = useQuizState();
    const [category , setCategory] = useState(0);
    const [difficulty , setDifficulty] = useState('');

    useEffect(() => {
        console.log('updating',category,difficulty);
        if (category === 0 || difficulty === '')
            {
                dispach({type:ActionsNames.Clear});
            }else{
                const url =`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;
                console.log(url);
                fetch(url)
                .then(response => response.json())
                .then(json =>  {
                    const data:QuizData[] = json.results;
                    dispach({type: ActionsNames.Fill, data})
                })
                    }
        },[category,difficulty,dispach]);

        function selectorhandler(category:number,difficulty:string)
    {
      setCategory(category) ;
      setDifficulty(difficulty) ;
      console.log('updating');
    }

    function onButtonClick()
    {
        navigate(routes.results);
    }

    return(
        <div className="m-3">
            <h1>QUIZ MAKER</h1>
            <Selector onChange={selectorhandler}/>
            <QuizDetails />
            <div className="d-grid gap-2">
                <button className="btn btn-secondary" type="button" hidden={!resultAvailable}
                onClick={onButtonClick}
                >Submit</button>
            </div>
        </div>
    );
}

export default QuizMaker;