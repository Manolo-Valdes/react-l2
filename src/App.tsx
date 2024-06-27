import { RouterProvider } from 'react-router-dom';
import './App.css';
import { QuizProvider } from './QuizContext';
import router from './Router';

function App() {

  return (
    <QuizProvider>
      <RouterProvider router={router} />
    </QuizProvider>
  );
}

export default App;
