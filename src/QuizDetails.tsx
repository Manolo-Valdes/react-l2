import QuizItem from "./QuizItem";
import { useQuizState } from "./QuizContext";


function QuizDetails({readOnly=false}){
    const {data} = useQuizState();

    return (
        <div className="m-3">
            {
                data.map((item,i) =>(
                    <QuizItem key={i} data={item} readOnly={readOnly}/>
                ))
            }
        </div>
    );
}

export default QuizDetails;