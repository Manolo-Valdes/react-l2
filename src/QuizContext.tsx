import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import { Difficulty, QuizAnswer, QuizData, QuizStateRecord } from "./QuizModels";


interface QuizState
{
   data:QuizStateRecord[]
   resultAvailable:boolean
}

const defaultState :QuizState =
{
    data:[],
    resultAvailable:false
}

export type QuizSelector =
{
    category:number,
    difficulty:Difficulty,
    index:number
}

export enum ActionsNames {
    Clear = "Clear State",
    Fill = "Fill State",
    SelectAnswer="Select Answer"
}

type Actions = {type: ActionsNames.Clear}|
                {type:ActionsNames.Fill, data:QuizData[] }|
               {type: ActionsNames.SelectAnswer,recordIndex:number , selectedItem:number};
               

function defaultAction(action:Actions)
{

}

function quizReducer(state:QuizState, action:Actions):QuizState
{
    console.log('reducing ', action);
    console.log('state ', state);
    switch(action.type)
    {
        case ActionsNames.Clear:
            return defaultState;
        case ActionsNames.Fill:
            return fill(action.data);
        case ActionsNames.SelectAnswer:
            return SelectAnswer(state, action.recordIndex, action.selectedItem);
    }
    return state;
}

    function fill(data:QuizData[]):QuizState
    {
        const _data = data.map<QuizStateRecord>((item, i)=>({index:i,
            question:item.question,
            correctAnswerdIndex:-1,
            answers:randomOrder(item)
          })); 
        return {...defaultState, data:_data};
    }

    function randomOrder(data:QuizData):QuizAnswer[]
    {
        const values:string[] = [...data.incorrect_answers, data.correct_answer]
        for (let i = values.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = values[i];
          values[i] = values[j];
          values[j] = temp;
        }
        return values.map<QuizAnswer>((v,i) => ({index:i,value:v,selected:false}));
    }


    function SelectAnswer(state:QuizState, recordIndex:number , selectedItem:number):QuizState
      {
        const selected = state.data.find(i => i.index === recordIndex);
        if (selected === undefined)
            return state;

        selected.answers.forEach(i=> i.selected = i.index === selectedItem);
        const data = [...state.data]
        data[recordIndex]={...selected};

        let resultAvailable = true;
        data.forEach(i=> {
            resultAvailable = resultAvailable && i.answers.some(a=> a.selected);
        });
        return {...state, data, resultAvailable}
    }


const QuizStateContext = createContext<QuizState>(defaultState);
const QuizDispatchContext = createContext<Dispatch<Actions>>(defaultAction);

export function QuizProvider({ children }:{children:ReactNode}) {
    const [state, dispatch] = useReducer(quizReducer, defaultState);
  

    return (
      <QuizStateContext.Provider value={state}>
        <QuizDispatchContext.Provider value={dispatch}>
          {children}
        </QuizDispatchContext.Provider>
      </QuizStateContext.Provider>
    );
  }

  export function useQuizState()
  {
      const context = useContext(QuizStateContext);
      if (!context)
          throw new Error('unable to create QuizStateContext context');
      return context;
  }

  export function useQuizQuizDispatcher():Dispatch<Actions>
  {
      const context = useContext(QuizDispatchContext);
      if (!context)
          throw new Error('unable to create QuizDispatchContext context');
      return context;
  }