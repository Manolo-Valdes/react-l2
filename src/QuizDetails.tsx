import { useEffect } from "react";
import QuizItem from "./QuizItem";
import { ActionsNames, useQuizQuizDispatcher, useQuizState } from "./QuizContext";
import { QuizData } from "./QuizModels";

interface QuizDetailsProps
{
    category:number,
    difficulty:string
}

function QuizDetails({category,difficulty}:QuizDetailsProps){
    const dispach = useQuizQuizDispatcher();
    const {data , resultAvailable} = useQuizState();

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

    return (
        <div className="m-3">
            {
                data.map((item,i) =>(
                    <QuizItem key={i} data={item}/>
                ))
            }
            <div className="d-grid gap-2">
                <button className="btn btn-secondary" type="button" hidden={!resultAvailable}>Submit</button>
            </div>
        </div>
    );
}

export default QuizDetails;