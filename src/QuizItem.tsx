import { QuizAnswer, QuizStateRecord } from "./QuizModels";
import { ActionsNames, useQuizQuizDispatcher } from "./QuizContext";

export interface QuizItemProps
{
    data:QuizStateRecord,
    readOnly:boolean
}



function QuizItem({data, readOnly}:QuizItemProps)
{
    const dispach = useQuizQuizDispatcher();

     const getButtonClassess = (item:QuizAnswer)=>{
        if (readOnly)
            {
                if (item.index === data.correctAnswerdIndex)
                    return "btn btn-success m-1";
                if (item.selected && item.index !== data.correctAnswerdIndex)
                    return "btn btn-danger m-1";
            }
        return "btn btn-outline-success m-1" + (item.selected ? " active":"");
     }  

     const selectItem = (index:number) =>
        {
            dispach({type: ActionsNames.SelectAnswer,recordIndex:data.index ,selectedItem:index});
        }
    
    return(
        <>
        <p>{data.question}</p>
        <div className="m-2">
            {
                data.answers.map((item) =>(
                    <button disabled={readOnly} type="button" className={getButtonClassess(item)} key={item.index} onClick={()=>selectItem(item.index)}>{item.value}</button>
                )
                )
            }
        </div>
        </>
    );
}


export default QuizItem;