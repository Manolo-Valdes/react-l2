import { QuizStateRecord } from "./QuizModels";
import { ActionsNames, useQuizQuizDispatcher } from "./QuizContext";

export interface QuizItemProps
{
    data:QuizStateRecord
}



function QuizItem({data}:QuizItemProps)
{
    const dispach = useQuizQuizDispatcher();

     const getButtonClassess = (selected:boolean)=> "btn btn-outline-success m-1" + (selected ? " active":"") 

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
                    <button  type="button" className={getButtonClassess(item.selected)} key={item.index} onClick={()=>selectItem(item.index)}>{item.value}</button>
                )
                )
            }
        </div>
        </>
    );
}


export default QuizItem;