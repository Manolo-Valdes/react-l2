

export interface QuizData
{
    type:string,
    difficulty:string,
    category:string,
    question:string,
    correct_answer:string,
    incorrect_answers:string[]
}

export type Difficulty = "easy"|"medium"|"hard";

export interface QuizAnswer{
    index:number,
    value:string,
    selected:boolean,
}

export interface QuizStateRecord{
    index:number,
    question:string,
    correctAnswerdIndex:number,
    answers:QuizAnswer[]
}