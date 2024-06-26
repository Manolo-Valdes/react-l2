import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Selector from './Selector';
import QuizDetails from './QuizDetails';
import { QuizProvider } from './QuizContext';

function App() {

  const [category , setCategory] = useState(0);
  const [difficulty , setDifficulty] = useState('');
  const selectorhandler = (category:number,difficulty:string) =>
  {
    setCategory(category) ;
    setDifficulty(difficulty) ;
    console.log('updating');
  }
  return (
    <QuizProvider>
    <div className="m-3">
      <h1>QUIZ MAKER</h1>
      <Selector onChange={selectorhandler}/>
      <QuizDetails category={category} difficulty={difficulty} />
    </div>
    </QuizProvider>
  );
}

export default App;
