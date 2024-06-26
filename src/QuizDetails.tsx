import { useEffect, useState } from "react";
import QuizItem from "./QuizItem";
import { QuizData } from "./QuizModels";
import { ActionsNames, useQuizQuizDispatcher, useQuizState } from "./QuizContext";

interface QuizDetailsProps
{
    category:number,
    difficulty:string
}

function QuizDetails({category,difficulty}:QuizDetailsProps){
    const dispach = useQuizQuizDispatcher();
    const {data} = useQuizState();

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
                .then(data =>  dispach({type: ActionsNames.Fill, data:data.results}))
                    }
        },[category,difficulty,dispach]);

    return (
        <div className="m-3">
            {
                data.map((item,i) =>(
                    <QuizItem key={i} data={item}/>
                ))
            }
        </div>
    );
}

export default QuizDetails;