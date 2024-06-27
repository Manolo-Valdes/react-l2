import {
    createBrowserRouter,
  } from "react-router-dom";
import QuizResults from "./QuizResults";
import QuizMaker from "./QuizMaker";

const router = createBrowserRouter([
    {
      path: "/",
      element: (<QuizMaker/>),
    },
    {
      path: "/results",
      element: (<QuizResults />),
    },
  ]);

export default router;