import {
    createBrowserRouter,
  } from "react-router-dom";
import QuizResults from "./QuizResults";
import QuizMaker from "./QuizMaker";

const router = createBrowserRouter([
    {
      path: "/react-l2",
      element: (<QuizMaker/>),
    },
    {
      path: "/react-l2/results",
      element: (<QuizResults />),
    },
     {
        element: (<QuizMaker/>),
      },
    ]);

export default router;