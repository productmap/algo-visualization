import { createBrowserRouter } from "react-router-dom";

// Страницы
import {
  MainPage,
  StringPage,
  FibonacciPage,
  SortingPage,
  StackPage,
  QueuePage,
  ListPage,
} from "../pages";
import AppWrapper from "../components/app-wrapper/app-wrapper";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/recursion",
        element: <StringPage />,
      },
      {
        path: "/fibonacci",
        element: <FibonacciPage />,
      },
      {
        path: "/sorting",
        element: <SortingPage />,
      },
      {
        path: "/stack",
        element: <StackPage />,
      },
      {
        path: "/queue",
        element: <QueuePage />,
      },
      {
        path: "/list",
        element: <ListPage />,
      },
    ],
  },
]);
