import {
    createBrowserRouter,
  } from "react-router-dom";
import QuizResults from "./QuizResults";
import QuizMaker from "./QuizMaker";

export const enum routes{
    home="/react-l2",
    results="/react-l2/results"
};

const router = createBrowserRouter([
    {
      path: routes.home,
      element: (<QuizMaker/>),
    },
    {
      path: routes.results,
      element: (<QuizResults />),
    },
     {
        element: (<QuizMaker/>),
      },
    ]);

export default router;